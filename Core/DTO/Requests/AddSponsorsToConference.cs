using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTO.Requests
{
    public class AddSponsorsToConference
    {
        public int ConferenceID { get; set; }
        public List<SponsorModel> Sponsors { get; set; }
    }
}
