using System.Collections.Generic;

namespace Persistence.Models
{
    public class RateCriterion
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int RateCriterionTypeID { get; set; }

        public RateCriterionType RateCriterionType { get; set; }
        public virtual ICollection<Rate> Rates { get; set; }
    }
}
