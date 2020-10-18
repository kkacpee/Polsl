using Core.Interfaces.Collections;
using Core.Models.Operations;
using Mapster;
using Microsoft.EntityFrameworkCore;
using Core.Models.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Extensions
{
    public static class IEnumerableExtensions
    {
        public static async Task<CollectionResult<T>> ToCollectionResultAsync<T>(this IEnumerable<T> list, CancellationToken cancellationToken) where T : class
        {
            cancellationToken.ThrowIfCancellationRequested();

            var result = list is IQueryable<T> queryable && queryable is IAsyncEnumerable<T>
                ? await queryable.ToListAsync(cancellationToken)
                : list.ToList();

            return new CollectionResult<T>(result);
        }

        public static Task<CollectionResult<V>> ToCollectionResultAsync<T, V>(this IEnumerable<T> source, CancellationToken cancellationToken) where T : class where V : class
        {
            cancellationToken.ThrowIfCancellationRequested();
            CollectionResult<V> destination = source.Adapt<CollectionResult<V>>();
            return Task.FromResult(destination);
        }

        public static async Task<CollectionResult<V>> ToCollectionResultAsync<T, V>(this ICollectionResult<T> source, Func<T, V> factoryExpr, CancellationToken cancellationToken) where T : class where V : class
        {
            cancellationToken.ThrowIfCancellationRequested();
            CollectionResult<V> destination = await Task.FromResult(new CollectionResult<V>(source.Select(x => factoryExpr(x))));
            destination.TotalCount = source.TotalCount;
            destination.PagesCount = source.PagesCount;
            destination.CurrentPage = source.CurrentPage;
            return destination;
        }

        public static Task<CollectionResult<V>> ToCollectionResultAsync<T, V>(this ICollectionResult<T> source, CancellationToken cancellationToken) where T : class where V : class
        {
            cancellationToken.ThrowIfCancellationRequested();
            CollectionResult<V> destination = source.Adapt<CollectionResult<V>>();
            destination.TotalCount = source.TotalCount;
            destination.PagesCount = source.PagesCount;
            destination.CurrentPage = source.CurrentPage;
            return Task.FromResult(destination);
        }

        public async static Task<CollectionResult<V>> ToExecutedResponseAsync<V>(this IQueryable<V> entityResponse, OperationQuery query, CancellationToken cancellationToken) where V : class
        {
            var totalCount = entityResponse is IAsyncEnumerable<V>
                ? await entityResponse.CountAsync()
                : entityResponse.Count();

            query ??= new OperationQuery();

            if (!string.IsNullOrEmpty(query.Sort))
            {
                entityResponse = OrderBy(entityResponse, query.Sort);
            }

            CollectionResult<V> result;

            if (query.PageSize < 1)
            {
                result = await entityResponse.ToCollectionResultAsync(cancellationToken);
                result.CurrentPage = totalCount == 0 ? 0 : 1;
                result.PagesCount = totalCount == 0 ? 0 : 1;
                result.TotalCount = totalCount;
            }
            else
            {
                query.CurrentPage = query.CurrentPage > 0 ? query.CurrentPage : 1;

                var pagesCount = (totalCount + query.PageSize - 1) / query.PageSize;
                var currentPage = query.CurrentPage > pagesCount ? pagesCount : query.CurrentPage;
                var internalCurrentPage = currentPage > 0 ? currentPage : 1;

                result = await entityResponse.Skip(query.PageSize * (internalCurrentPage - 1)).Take(query.PageSize).ToCollectionResultAsync(cancellationToken);
                result.CurrentPage = currentPage;
                result.PagesCount = pagesCount;
                result.TotalCount = totalCount;
            }

            return result;
        }

        public static IQueryable<V> OrderBy<V>(IQueryable<V> entityResponse, string sortExpression)
        {
            if (entityResponse == null)
                throw new ArgumentNullException("source", "source is null.");

            var sortExpressionSplitted = sortExpression.Split(",");

            try
            {
                (var sortLambda, var isDescending, var tType, var prop) = PrepareSortLambda(entityResponse, sortExpression);

                var sorter = typeof(Queryable)
                .GetMethods()
                .FirstOrDefault(x => x.Name == (isDescending ? "OrderByDescending" : "OrderBy") && x.GetParameters().Length == 2)
                .MakeGenericMethod(new[] { tType, prop.PropertyType });

                var result = (IQueryable<V>)sorter
                        .Invoke(null, new object[] { entityResponse, sortLambda });

                if (sortExpressionSplitted.Length > 1)
                {
                    for (int i = 0; i < sortExpressionSplitted.Length - 1; i++)
                    {
                        result = ThenBy<V>(entityResponse, sortExpressionSplitted[i].Trim());
                    }
                }

                return result;
            }
            catch
            {
                return entityResponse;
            }
        }

        private static (LambdaExpression, bool, Type, PropertyInfo) PrepareSortLambda<V>(IQueryable<V> entityResponse, string sortExpression)
        {
            sortExpression = sortExpression.First().ToString().ToUpper() + sortExpression.Substring(1);
            sortExpression = sortExpression.Replace('_', ' ');
            var parts = sortExpression.Split(' ');
            var isDescending = false;
            var tType = typeof(V);

            if (parts.Length <= 0 || parts[0] == "")
                throw new Exception(); //return entityResponse;

            var propertyName = parts[0];

            if (parts.Length > 1)
                isDescending = parts[1].ToLower().Contains("desc");

            var prop = tType.GetProperty(propertyName) ?? tType.GetProperties().FirstOrDefault(x => x.Name.Equals(propertyName, StringComparison.OrdinalIgnoreCase));

            if (prop == null) throw new Exception();

            var funcType = typeof(Func<,>)
                .MakeGenericType(tType, prop.PropertyType);

            var lambdaBuilder = typeof(Expression)
                .GetMethods()
                .First(x => x.Name == "Lambda" && x.ContainsGenericParameters && x.GetParameters().Length == 2)
                .MakeGenericMethod(funcType);

            return (CreateExpression(tType, propertyName), isDescending, tType, prop);
        }

        private static IQueryable<V> ThenBy<V>(IQueryable<V> entityResponse, string sortExpression)
        {
            if (entityResponse == null)
                throw new ArgumentNullException("source", "source is null.");

            var sortExpressionSplitted = sortExpression.Split(",");

            (var sortLambda, var isDescending, var tType, var prop) = PrepareSortLambda(entityResponse, sortExpression);

            var sorter = typeof(Queryable)
                .GetMethods()
                .FirstOrDefault(x => x.Name == (isDescending ? "ThenByDescending" : "ThenBy") && x.GetParameters().Length == 2)
                .MakeGenericMethod(new[] { tType, prop.PropertyType });

            return (IQueryable<V>)sorter
                    .Invoke(null, new object[] { entityResponse, sortLambda });
        }

        static LambdaExpression CreateExpression(Type type, string propertyName)
        {
            var param = Expression.Parameter(type, "x");
            Expression body = param;
            foreach (var member in propertyName.Split('.'))
            {
                body = Expression.PropertyOrField(body, member);
            }
            return Expression.Lambda(body, param);
        }

        public static void ForEach<T>(this IEnumerable<T> enumeration, Action<T> action)
        {
            foreach (var item in enumeration)
            {
                action(item);
            }
        }

        public static async Task ForEachAsync<T>(this IEnumerable<T> enumeration, Func<T, Task> func)
        {
            foreach (var item in enumeration)
            {
                await func(item);
            }
        }

        public static async Task<IEnumerable<TResult>> SelectAsync<T, TResult>(this IEnumerable<T> enumeration, Func<T, Task<TResult>> func)
        {
            var list = new List<TResult>();
            await enumeration.ForEachAsync(async item => list.Add(await func(item)));

            return list;
        }

        public static IEnumerable<TSource> DistinctBy<TSource, TKey>(
            this IEnumerable<TSource> source,
            Func<TSource, TKey> keySelector)
        {
            HashSet<TKey> keys = new HashSet<TKey>();

            foreach (TSource item in source)
            {
                if (keys.Add(keySelector(item)))
                {
                    yield return item;
                }
            }
        }
    }
}
