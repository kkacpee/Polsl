﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Core.DTO.Requests
{
    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
