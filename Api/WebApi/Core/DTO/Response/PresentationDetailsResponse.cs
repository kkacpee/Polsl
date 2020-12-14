using Core.Models;
using System;
using System.Collections.Generic;

namespace Core.DTO.Response
{
    public class PresentationDetailsResponse
    {
        public int ID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Place { get; set; }
        public string Authors { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
        public int ConferenceID { get; set; }
        public int PresentationTypeID { get; set; }
        public string PresentationTypeName { get; set; }

        public virtual ICollection<ParticipantModel> Participants { get; set; }
        public List<PresentationPhotoResponse> Photos { get; set; }
    }
}
