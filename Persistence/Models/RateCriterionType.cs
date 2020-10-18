using System.Collections.Generic;

namespace Persistence.Models
{
    public class RateCriterionType
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public virtual ICollection<RateCriterion> RateCriterions { get; set; }
    }
}
