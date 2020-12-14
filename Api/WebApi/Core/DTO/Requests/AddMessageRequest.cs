using System;

namespace Core.DTO.Requests
{
    public class AddMessageRequest
    {
        public int MobileUserID { get; set; }
        public string Content { get; set; }
    }
}
