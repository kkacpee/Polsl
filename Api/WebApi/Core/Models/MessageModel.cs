using System;

namespace Core.Models
{
    public class MessageModel
    {
        public int ID { get; set; }
        public DateTime SentDate { get; set; }
        public int MobileUserID { get; set; }
        public string Content { get; set; }
    }
}
