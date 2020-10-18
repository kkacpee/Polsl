namespace Core.Models.Operations
{
    public sealed class OperationQuery
    {
        public int PageSize { get; set; }
        public int CurrentPage { get; set; }
        public string Sort { get; set; }
        public string SearchValue { get; set; }

        public static OperationQuery All => new OperationQuery { CurrentPage = 0, PageSize = 0, SearchValue = null, Sort = null };
    }
}