using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace Persistence.Models
{
    public class User : IdentityUser<int>
    {
        public virtual ICollection<Rate> Rates { get; set; }
        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
