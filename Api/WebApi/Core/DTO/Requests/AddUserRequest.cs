using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTO.Requests
{
    public class AddUserRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
