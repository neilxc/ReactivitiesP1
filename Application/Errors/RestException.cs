using System;
using System.Net;

namespace Application.Errors
{
    public class RestException : Exception
    {
        public RestException(HttpStatusCode code, Object errors)
        {
            Code = code;
            Errors = errors;
        }
        public HttpStatusCode Code { get; set; }
        public Object Errors { get; set; }
    }
}