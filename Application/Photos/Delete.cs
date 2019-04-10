using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor,
                IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(x =>
                    x.UserName == _userAccessor.GetCurrentUsername());

                if (user.Photos.All(x => x.Id != request.Id))
                    throw new RestException(HttpStatusCode.Forbidden, 
                        new {Photo = "you are not allowed to delete this photo"});

                var photo = await _context.Photos.FindAsync(request.Id);

                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound, new {Photo = "not found"});
                
                if (photo.IsMain && user.Photos.Count > 1) {
                    var otherPhoto = await _context.Photos.FirstOrDefaultAsync(x => 
                        x.Id != request.Id);
                    otherPhoto.IsMain = true;
                }

                user.Photos.Remove(photo);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}