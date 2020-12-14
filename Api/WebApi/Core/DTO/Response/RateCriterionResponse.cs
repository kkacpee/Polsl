using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTO.Response
{
    public class RateCriterionResponse
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int RateCriterionTypeID { get; set; }
        public string RateCriterionTypeName { get; set; }
    }
}
