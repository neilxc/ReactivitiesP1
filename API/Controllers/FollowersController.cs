using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Followers;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/profiles")]
    public class FollowersController : BaseController
    {
        [HttpPost("{username}/follow")]
        public async Task<FollowDto> Follow(string username)
        {
            return await Mediator.Send(new Add.Command{Username = username});
        }

        [HttpDelete("{username}/follow")]
        public async Task<Unit> Unfollow(string username)
        {
            return await Mediator.Send(new Delete.Command{Username = username});
        }

        [HttpGet("{username}/follow")]
        public async Task<List<Profile>> GetFollowings(string username, bool followers)
        {
            return await Mediator.Send(new List.Query{Username = username, 
                Followers = followers});
        }
    }
}