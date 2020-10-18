using Core.HttpClient;
using System.Collections.Generic;

namespace Core.Interfaces.Collections
{
    public interface ICollectionResult<T> : IHttpClientResponse, IEnumerable<T>, IList<T> where T : class
    {
        int TotalCount { get; set; }
        int PagesCount { get; set; }
        int CurrentPage { get; set; }
    }
}
