using System.Threading.Tasks;
using Application.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [AllowAnonymous]
    public class UserController : BaseController
    {
        [HttpGet]
        [Authorize]
        public async Task<User> GetCurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

        [HttpPost("login")]
        public async Task<User> Login(Login.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost("register")]
        public async Task<User> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }
    }
}