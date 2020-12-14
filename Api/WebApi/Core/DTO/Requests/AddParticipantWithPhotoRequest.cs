using Microsoft.AspNetCore.Http;

namespace Core.DTO.Requests
{
    public class AddParticipantWithPhotoRequest
    {
        public string Company { get; set; }
        public string Affiliation { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IFormFile? File { get; set; }
    }
}
