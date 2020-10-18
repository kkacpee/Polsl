using Newtonsoft.Json;

namespace Core.HttpClient
{
    public class HttpClientResponse<T> : IHttpClientResponse where T : class
    {
        public T data { get; set; }

        [JsonProperty("totalCount")]
        public int TotalCount { get; set; }

        public int PagesCount { get; set; }

        public int CurrentPage { get; set; }
    }
}
