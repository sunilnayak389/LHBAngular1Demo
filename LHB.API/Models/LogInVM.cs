using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LHB.API.Models
{
    public class LogInVM
    {
        public string Name { get; set; }
        public string Password { get; set; }
        public bool IsRemember { get; set; }
    }
}