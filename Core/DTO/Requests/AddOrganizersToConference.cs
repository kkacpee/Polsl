using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class AddOrganizersToConference
    {
        public int ConferenceID { get; set; }
        public List<OrganizerModel> Organizers { get; set; }
    }
}
