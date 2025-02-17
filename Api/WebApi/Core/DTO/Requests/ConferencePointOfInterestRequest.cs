﻿using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class ConferencePointOfInterestRequest
    {
        public int ConferenceID { get; set; }
        public List<int> PointOfInterestIDs { get; set; }
    }
}
