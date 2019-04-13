using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
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
                var observer = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                var target = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == request.Username);

                if (target == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new { User = "Not Found" });

                var following = await _context.Followings
                    .FirstOrDefaultAsync(x => x.ObserverId == observer.Id
                        && x.TargetId == target.Id);

                if (following != null)
                {
                    _context.Followings.Remove(following);
                    await _context.SaveChangesAsync();
                }

                return Unit.Value;
            }
        }
    }
}