﻿using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class ConferenceOrganizerRequest
    {
        public int ConferenceID { get; set; }
        public List<int> OrganizerIDs { get; set; }
    }
}
