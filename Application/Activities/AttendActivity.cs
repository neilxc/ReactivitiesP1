using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class AttendActivity
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }
        
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }
        
            public async Task<Unit> Handle(Command request, 
                CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.SingleOrDefaultAsync(x => 
                    x.Id == request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, 
                        new {Activity = "Not Found"});
                
                var user = await _context.Users.SingleOrDefaultAsync(x => 
                    x.UserName == _userAccessor.GetCurrentUsername());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(
                    x => x.ActivityId == activity.Id && x.AppUserId == user.Id);

                if (attendance != null)
                    throw new RestException(HttpStatusCode.BadRequest, 
                        new {Attendee = "Already attending this activity"});

                if (attendance == null) 
                {
                    attendance = new UserActivity
                    {
                        ActivityId = activity.Id,
                        AppUserId = user.Id,
                        IsHost = false
                    };
                }

                _context.UserActivities.Add(attendance);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}