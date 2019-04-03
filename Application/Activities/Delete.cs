using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.SingleOrDefaultAsync(x => 
                    x.Id == request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, 
                        new {Activity = "Not Found"});

                _context.Remove(activity);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}