using Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTO.Requests
{
    public class ConferenceSponsorRequest
    {
        public int ConferenceID { get; set; }
        public List<int> SponsorIDs { get; set; }
    }
}
