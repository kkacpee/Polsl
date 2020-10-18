using Core.Interfaces.Collections;
using System.Collections.Generic;

namespace Core.Models.Collections
{
    public class CollectionResult<T> : List<T>, ICollectionResult<T> where T : class
    {
        public CollectionResult() : base()
        {
        }

        public CollectionResult(IEnumerable<T> source) : base(source)
        {
        }

        public int TotalCount { get; set; }
        public int PagesCount { get; set; }
        public int CurrentPage { get; set; }
    }
}
