using Microsoft.AspNetCore.Http;

namespace Core.DTO.Requests
{
    public class AddParticipantPhotoRequest
    {
        public IFormFile? File { get; set; }
        public int ParticipantID { get; set; }
    }
}
