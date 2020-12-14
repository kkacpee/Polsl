using System;

namespace Core.DTO.Requests
{
    public class AddConferenceRequest
    {
        public string Address { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Title { get; set; }
        public string SocialMedia { get; set; }
    }
}
