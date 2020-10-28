﻿using Core.Models;
using System.Collections.Generic;

namespace Core.DTO.Requests
{
    public class AddAccommodationsToConferenceRequest
    {
        public int ConferenceID { get; set; }
        public List<AccommodationModel> Accommodations { get; set; }
    }
}
