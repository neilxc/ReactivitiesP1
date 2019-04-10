using System;

namespace Domain
{
    public class UserActivity
    {
        public string AppUserId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int ActivityId { get; set; }
        public virtual Activity Activity { get; set; }
        public bool IsHost { get; set; }
    }
}