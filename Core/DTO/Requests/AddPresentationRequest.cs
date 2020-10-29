using System;

namespace Core.DTO.Requests
{
    public class AddPresentationRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Place { get; set; }
        public string Authors { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int ConferenceID { get; set; }
        public int PresentationTypeID { get; set; }
    }
}
