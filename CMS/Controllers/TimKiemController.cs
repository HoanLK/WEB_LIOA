using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("tim-kiem")]
    public class TimKiemController : Controller
    {
        private LioaEntities db = new LioaEntities();

        [Route]
        public ActionResult Index()
        {
            //Check lượt truy cập
            ClientAccess client = new ClientAccess()
            {
                ipClient = Server.HtmlEncode(Request.UserHostAddress).ToString(),
                time = DateTime.Now
            };

            var temp = db.ClientAccess.Where(p => p.ipClient == client.ipClient && p.time.Value.Day == client.time.Value.Day && p.time.Value.Month == client.time.Value.Month && p.time.Value.Year == client.time.Value.Year);

            if (temp.Count() < 2)
            {
                db.ClientAccess.Add(client);
            }
            else
            {
                db.ClientAccess.Remove(temp.FirstOrDefault());
                db.ClientAccess.Add(client);
            }

            db.SaveChanges();

            return View();
        }
    }
}