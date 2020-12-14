using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTO.Response
{
    public class ParticipantResponse
    {
        public int ID { get; set; }
        public string Company { get; set; }
        public string Affiliation { get; set; }
        public string Country { get; set; }
        public string Description { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Photo { get; set; }
    }
}
