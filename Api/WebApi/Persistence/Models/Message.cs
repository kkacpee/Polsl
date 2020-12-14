using System;

namespace Persistence.Models
{
    public class Message
    {
        public int ID { get; set; }
        public DateTime SentDate { get; set; }
        public int MobileUserID { get; set; }
        public string Content { get; set; }
    }
}
