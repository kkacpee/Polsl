using Microsoft.AspNetCore.Http;

namespace Core.DTO.Requests
{
    public class AddPresentationPhotoRequest
    {
        public IFormFile File { get; set; }
        public int ID { get; set; }
    }
}
