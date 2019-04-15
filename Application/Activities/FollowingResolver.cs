using System.Linq;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using Domain;
using Persistence;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public FollowingResolver(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public bool Resolve(UserActivity source, AttendeeDto destination, 
            bool destMember, ResolutionContext context)
        {
            var currentUser = _context.Users.SingleOrDefault(x =>
                x.UserName == _userAccessor.GetCurrentUsername());

            if (currentUser.Following.Any(x => x.TargetId == source.AppUser.Id))
                return true;

            return false;
        }
    }
}