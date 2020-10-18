using Microsoft.EntityFrameworkCore.Storage;

namespace Core.Repositories
{
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Query;
    using Core.Extensions;
    using Interfaces.Collections;
    using Core.Interfaces.Repositories;
    using Models.Operations;
    using Persistence;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore.ChangeTracking;

    public class GenericRepository<TEntity> : BaseRepository, IGenericRepository<TEntity> where TEntity : class
    {
        public GenericRepository(ApiDbContext context) : base(context) { }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync(
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<TEntity, dynamic> distinctBy = null)
        {
            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            var result = await query.ToListAsync(cancellationToken);

            return distinctBy != null ? result.DistinctBy(distinctBy) : result;
        }

        public virtual async Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            int? take = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;
            query = query.Where(predicate);
            query = take.HasValue ? query.Take(take.Value) : query;

            return await query.ToListAsync(cancellationToken);
        }

        public virtual async Task<IEnumerable<TResult>> SelectAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TResult>, IOrderedQueryable<TResult>> orderBy = null,
            int? take = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            var selectedQuery = query.Where(predicate).Select(select);

            selectedQuery = orderBy?.Invoke(selectedQuery) ?? selectedQuery;
            selectedQuery = take.HasValue ? selectedQuery.Take(take.Value) : selectedQuery;

            return await selectedQuery.ToListAsync(cancellationToken);
        }

        public virtual async Task<IEnumerable<TResult>> GroupByAndSelectAsync<TKey, TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TKey>> groupBy,
            Expression<Func<IGrouping<TKey, TEntity>, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TResult>, IOrderedQueryable<TResult>> orderBy = null,
            int? take = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;

            var groupByQuery = query.Where(predicate).GroupBy(groupBy).Select(select);
            groupByQuery = orderBy?.Invoke(groupByQuery) ?? groupByQuery;
            groupByQuery = take.HasValue ? groupByQuery.Take(take.Value) : groupByQuery;

            return await groupByQuery.ToListAsync(cancellationToken);
        }

        public virtual async Task<ICollectionResult<TResult>> SelectAndGetCollectionResultAsync<TResult>(
            Expression<Func<TEntity, TResult>> select,
            OperationQuery operationQuery,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null) where TResult : class
        {
            if (operationQuery == null) throw new ArgumentNullException($"Parameter {nameof(operationQuery)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.Select(select).ToExecutedResponseAsync(operationQuery, cancellationToken);
        }

        public virtual async Task<ICollectionResult<TResult>> SelectAndGetCollectionResultAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            OperationQuery operationQuery,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null) where TResult : class
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (operationQuery == null) throw new ArgumentNullException($"Parameter {nameof(operationQuery)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.Where(predicate).Select(select).ToExecutedResponseAsync(operationQuery, cancellationToken);
        }

        public virtual async Task<ICollectionResult<TEntity>> GetCollectionResultAsync(
            Expression<Func<TEntity, bool>> predicate,
            OperationQuery operationQuery,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (operationQuery == null) throw new ArgumentNullException($"Parameter {nameof(operationQuery)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.Where(predicate).ToExecutedResponseAsync(operationQuery, cancellationToken);
        }

        public virtual async Task<ICollectionResult<TEntity>> GetCollectionResultAsync(
            OperationQuery operationQuery,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (operationQuery == null) throw new ArgumentNullException($"Parameter {nameof(operationQuery)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.ToExecutedResponseAsync(operationQuery, cancellationToken);
        }

        public virtual async Task<TEntity> GetByIdAsync<TId>(
            TId id,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null)
        {
            if (id == null || (id is int idInt && idInt == 0)) throw new ArgumentNullException($"Parameter {nameof(id)} cannot be null or zero.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;

            var lambda = CreateFindByPrimaryKeyLambda(id);

            var result = await query.SingleOrDefaultAsync(lambda, cancellationToken);
            if (result == null) throw new NullReferenceException($"Object of type {typeof(TEntity).Name} not found.");

            return result;
        }

        public virtual async Task<TEntity> GetFirstAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            var result = await query.FirstOrDefaultAsync(predicate, cancellationToken);
            if (result == null) throw new NullReferenceException($"Object of type {typeof(TEntity).Name} not found.");

            return result;
        }

        public virtual async Task<TResult> GetFirstAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            var result = query.Where(predicate);

            if (!await result.AnyAsync(cancellationToken)) throw new NullReferenceException($"Object of type {typeof(TEntity).Name} not found.");

            return await result.Select(select).FirstOrDefaultAsync(cancellationToken);
        }

        public virtual async Task<TEntity> GetFirstOrDefaultAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.FirstOrDefaultAsync(predicate, cancellationToken);
        }

        public virtual async Task<TResult> GetFirstOrDefaultAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.Where(predicate).Select(select).FirstOrDefaultAsync(cancellationToken);
        }

        public virtual async Task<TEntity> GetSingleAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;

            var result = await query.SingleOrDefaultAsync(predicate, cancellationToken);
            if (result == null) throw new NullReferenceException($"Object of type {typeof(TEntity).Name} not found.");

            return result;
        }

        public virtual async Task<TResult> GetSingleAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;

            var result = query.Where(predicate);

            if (!await result.AnyAsync(cancellationToken)) throw new NullReferenceException($"Object of type {typeof(TEntity).Name} not found.");

            return await result.Select(select).SingleOrDefaultAsync(cancellationToken);
        }

        public virtual async Task<TEntity> GetSingleOrDefaultAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;

            return await query.SingleOrDefaultAsync(predicate, cancellationToken);
        }

        public virtual async Task<TResult> GetSingleOrDefaultAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;

            return await query.Where(predicate).Select(select).SingleOrDefaultAsync(cancellationToken);
        }

        public virtual async Task<TEntity> GetLastAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.LastAsync(predicate, cancellationToken);
        }

        public virtual async Task<TResult> GetLastAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.Where(predicate).Select(select).LastAsync(cancellationToken);
        }

        public virtual async Task<TEntity> GetLastOrDefaultAsync(
            Expression<Func<TEntity, bool>> predicate,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.LastOrDefaultAsync(predicate, cancellationToken);
        }

        public virtual async Task<TResult> GetLastOrDefaultAsync<TResult>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TResult>> select,
            CancellationToken cancellationToken,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");
            if (select == null) throw new ArgumentNullException($"Parameter {nameof(select)} cannot be null.");

            var query = _context.Set<TEntity>().AsNoTracking();
            query = include?.Invoke(query) ?? query;
            query = orderBy?.Invoke(query) ?? query;

            return await query.Where(predicate).Select(select).LastOrDefaultAsync(cancellationToken);
        }

        public virtual async Task<bool> AnyAsync(CancellationToken cancellationToken)
        {
            return await _context.Set<TEntity>().AnyAsync(cancellationToken);
        }

        public virtual async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            return await _context.Set<TEntity>().AnyAsync(predicate, cancellationToken);
        }

        public virtual async Task<int> CountAsync(CancellationToken cancellationToken)
        {
            return await _context.Set<TEntity>().CountAsync(cancellationToken);
        }

        public virtual async Task<int> CountAsync(Expression<Func<TEntity, bool>> predicate, CancellationToken cancellationToken)
        {
            if (predicate == null) throw new ArgumentNullException($"Parameter {nameof(predicate)} cannot be null.");

            return await _context.Set<TEntity>().CountAsync(predicate, cancellationToken);
        }

        public virtual async Task<decimal> AverageAsync(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, decimal>> avg, CancellationToken cancellationToken)
        {
            if (avg == null) throw new ArgumentNullException($"Parameter {nameof(avg)} cannot be null.");

            if (predicate == null)
                return await _context.Set<TEntity>().AverageAsync(avg, cancellationToken);

            return await _context.Set<TEntity>().Where(predicate).AverageAsync(avg, cancellationToken);
        }

        public virtual async Task AddAsync(TEntity entity, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entity == null) throw new ArgumentNullException($"Parameter {nameof(entity)} cannot be null.");

            await _context.Set<TEntity>().AddAsync(entity, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task AddManyAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entities == null) throw new ArgumentNullException($"Parameter {nameof(entities)} cannot be null.");

            await _context.Set<TEntity>().AddRangeAsync(entities, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task UpdateAsync(TEntity entity, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entity == null) throw new ArgumentNullException($"Parameter {nameof(entity)} cannot be null.");

            _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync(cancellationToken);
            DetachAll(detachAll);
        }


        public virtual async Task UpdateManyAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entities == null) throw new ArgumentNullException($"Parameter {nameof(entities)} cannot be null.");

            _context.Set<TEntity>().UpdateRange(entities);
            await _context.SaveChangesAsync(cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task DeleteAsync(TEntity entity, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entity == null) throw new ArgumentNullException($"Parameter {nameof(entity)} cannot be null.");

            if (entity.GetType().GetProperties().All(x => x.Name != "IsDeleted"))
                throw new InvalidOperationException($"Entity {typeof(TEntity).Name} doesn't contain IsDeleted property. If you want to delete entities permanently use DeletePermanentlyAsync method.");

            entity.GetType().GetProperty("IsDeleted")?.SetValue(entity, true);
            await UpdateAsync(entity, cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task DeleteManyAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entities == null) throw new ArgumentNullException($"Parameter {nameof(entities)} cannot be null.");

            if (typeof(TEntity).GetProperties().All(x => x.Name != "IsDeleted"))
                throw new InvalidOperationException($"Entity {typeof(TEntity).Name} doesn't contain IsDeleted property. If you want to delete entities permanently use DeletePermanentlyAsync method.");

            foreach (var entity in entities)
            {
                entity.GetType().GetProperty("IsDeleted")?.SetValue(entity, true);
            }
            await UpdateManyAsync(entities, cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task DeleteByIdAsync<TId>(TId id, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (id == null || (id is int idInt && idInt == 0)) throw new ArgumentNullException($"Parameter {nameof(id)} cannot be null or zero.");

            var entity = await GetByIdAsync(id, cancellationToken);

            await DeleteAsync(entity, cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task DeletePermanentlyAsync(TEntity entity, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entity == null) throw new ArgumentNullException($"Parameter {nameof(entity)} cannot be null.");

            _context.Remove(entity);
            await _context.SaveChangesAsync(cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task DeletePermanentlyByIdAsync<TId>(TId id, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (id == null || (id is int idInt && idInt == 0)) throw new ArgumentNullException($"Parameter {nameof(id)} cannot be null or zero.");

            var entity = await GetByIdAsync(id, cancellationToken);

            await DeletePermanentlyAsync(entity, cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task DeleteManyPermanentlyAsync(IEnumerable<TEntity> entities, CancellationToken cancellationToken, bool detachAll = false)
        {
            if (entities == null) throw new ArgumentNullException($"Parameter {nameof(entities)} cannot be null.");

            _context.RemoveRange(entities);
            await _context.SaveChangesAsync(cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task<IDbContextTransaction> TransactionBeginAsync(CancellationToken cancellationToken)
        {
            return await _context.Database.BeginTransactionAsync(cancellationToken);
        }

        public virtual async Task TransactionCommitAsync(IDbContextTransaction transaction, CancellationToken cancellationToken, bool detachAll = false)
        {
            await transaction.CommitAsync(cancellationToken);
            DetachAll(detachAll);
        }

        public virtual async Task TransactionRollbackAsync(IDbContextTransaction transaction, CancellationToken cancellationToken)
        {
            await transaction.RollbackAsync(cancellationToken);
        }

        protected Expression<Func<TEntity, bool>> CreateFindByPrimaryKeyLambda<TId>(TId id)
        {
            var pkPropertyName = GetPrimaryKeyPropertyName();
            var propertyInfo = typeof(TEntity).GetProperty(pkPropertyName);

            if (propertyInfo?.PropertyType != typeof(TId)) throw new InvalidOperationException($"Invalid type of {nameof(id)} argument.");

            var parameter = Expression.Parameter(typeof(TEntity), "x");
            var member = Expression.MakeMemberAccess(parameter, propertyInfo);
            var constant = Expression.Constant(id, id.GetType());
            var equation = Expression.Equal(member, constant);

            return Expression.Lambda<Func<TEntity, bool>>(equation, parameter);
        }

        protected virtual string GetPrimaryKeyPropertyName() => _context.Model.FindEntityType(typeof(TEntity)).FindPrimaryKey().Properties.Select(x => x.Name).Single();

        private void DetachAll(bool detachAll)
        {
            if (detachAll)
            {
                var entityEntries = _context.ChangeTracker.Entries().ToArray();

                foreach (EntityEntry entityEntry in entityEntries)
                {
                    entityEntry.State = EntityState.Detached;
                }
            }
        }
    }
}
