using Microsoft.AspNetCore.Http;

namespace Core.DTO.Requests
{
    public class AddConferencePhotoRequest
    {
        public IFormFile File { get; set; }
        public int ID { get; set; }
    }
}
