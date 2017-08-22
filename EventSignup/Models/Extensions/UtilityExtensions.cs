using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventSignup.Web.Models.Extensions
{
    public static class UtilityExtensions
    {
        public static string GetExceptionMessageChain(this Exception ex)
        {
            var message = new StringBuilder(ex.Message);

            if (ex.InnerException != null)
            {
                message.AppendLine(GetExceptionMessageChain(ex.InnerException));
            }

            return message.ToString();
        }
    }
}
