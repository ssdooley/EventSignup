using Newtonsoft.Json;

namespace EventSignup.Web
{
    public class ApiError
    {
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
