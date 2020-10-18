using Microsoft.AspNetCore.Identity;

namespace Persistence.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public int UserID { get; set; }
        public int RoleID { get; set; }

        public User User { get; set; }
        public Role Role { get; set; }
    }
}
