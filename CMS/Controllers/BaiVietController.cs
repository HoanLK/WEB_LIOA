using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("bai-viet")]
    public class BaiVietController : Controller
    {
        private LioaEntities db = new LioaEntities();

        [Route]
        public ActionResult ShowAllBaiViet()
        {
            return View();
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Index(string alias, int id)
        {

            var model = db.Post.Where(p => p.idPost == id && p.alias == alias).FirstOrDefault();

            if (model == null)
            {
                return RedirectToAction("Index", "Home");
            }

            //SEO
            ViewBag.Title = model.title;
            ViewBag.Description = model.description;
            ViewBag.Keywords = model.metakewords;
            ViewBag.Robots = model.robots;
            ViewBag.Image = model.image;

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

            return View(model);
        }

        public JsonResult Search(string search)
        {
            var model = db.Post.Where(p => p.alias.Contains(search) ||
                                            p.content.Contains(search) ||
                                            p.description.Contains(search) ||
                                            p.title.Contains(search));
            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}