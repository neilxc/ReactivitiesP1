using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseController
    {
        [HttpGet]
        public async Task<List.ActivitiesEnvelope> List(bool isGoing, bool isHost, 
            DateTime? startDate, int? limit, int? offset)
        {
            return await Mediator.Send(new List.Query(isGoing, isHost, startDate, limit, offset));
        }

        [HttpGet("{id}")]
        public async Task<ActivityDto> Details(int id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<ActivityDto> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActivityDto> Edit(int id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<Unit> Delete(int id)
        {
            return await Mediator.Send(new Delete.Command{Id = id});
        }

        [HttpPost("{id}/attend")]
        public async Task<Unit> Attend(int id)
        {
            return await Mediator.Send(new AttendActivity.Command{Id = id});
        }

        [HttpDelete("{id}/attend")]
        public async Task<Unit> Unatted(int id)
        {
            return await Mediator.Send(new Unattend.Command{Id = id});
        }
    }
}