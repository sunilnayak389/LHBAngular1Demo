using LHB.API.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LHB.API.Controllers
{
    [EnableCors(origins: "http://localhost:63758", headers: "*", methods: "*")]
    public class DemoController : ApiController
    {
        
        [HttpGet]
        [Route("api/Demo/GetEmployee")]
        public IHttpActionResult GetEmployee()
        {
            // var emp = new EmployeeVM();
            // var empList = new List<EmployeeVM>();
            var empList = new Object();

            using (StreamReader r = new StreamReader("C:/Users/SUNIL/Source/Repos/LHBAngular1Demo/LHB.API/demodata.json"))
            {
                var json = r.ReadToEnd();
                empList = JsonConvert.DeserializeObject<Object>(json);

            }

            return Ok(new { data = empList });
        }


        [HttpPost]
        [Route("api/Demo/SaveEmployee")]
        public IHttpActionResult SaveEmployee([FromBody]LogInVM value)
        {
           

            return Ok(new { data = value });
        }

        // GET: api/Demo
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Demo/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Demo
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Demo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Demo/5
        public void Delete(int id)
        {
        }
    }
}
