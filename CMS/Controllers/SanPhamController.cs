﻿using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("san-pham")]
    public class SanPhamController : Controller
    {
        private LioaEntities db = new LioaEntities();

        // GET: SanPham
        [Route]
        public ActionResult EnterNone()
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

            return Redirect("/san-pham");
        }

        [Route("{alias}-{id:int}")]
        public ActionResult Index(string alias, int id)
        {

            var model = db.Product.Where(p => p.idProduct == id && p.alias == alias).FirstOrDefault();

            //SEO
            ViewBag.Title = model.title;
            ViewBag.Description = model.metadescription;
            ViewBag.Keywords = model.metakewords;
            ViewBag.Robots = model.robots;
            ViewBag.Image = model.image;

            if (model == null)
            {
                return HttpNotFound();
            }

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

        //Search
        public JsonResult Search(string search)
        {
            var model = db.Product.Where(p => p.title.Contains(search) ||
                                                p.description.Contains(search) ||
                                                p.content.Contains(search) ||
                                                p.feature.Contains(search) ||
                                                p.feature.Contains(search));

            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}