using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class AccessCounterController : Controller
    {
        // GET: Admin/AccessCounter
        public ActionResult Index()
        {
            return View();
        }

        public string GetCount()
        {
            using(LioaEntities db = new LioaEntities())
            {
                return db.ClientAccess.ToList().Count.ToString("#,##0");
            }
        }

        //Lượt truy cập trong ngày
        public string GetCountDay()
        {
            using (LioaEntities db = new LioaEntities())
            {
                return db.ClientAccess.Where(p => p.time.Value.Day== DateTime.Now.Day).ToList().Count.ToString("#,##0");
            }
        }

        //Lượt truy cập trong tháng
        public string GetCountMonth()
        {
            using (LioaEntities db = new LioaEntities())
            {
                return db.ClientAccess.Where(p => p.time.Value.Month == DateTime.Now.Month).ToList().Count.ToString("#,##0");
            }
        }

        //Lượt truy cập tháng trước
        public string GetCountMonthBefore()
        {
            using (LioaEntities db = new LioaEntities())
            {
                return db.ClientAccess.Where(p => p.time.Value.Month == DateTime.Now.Month - 1).ToList().Count.ToString("#,##0");
            }
        }
    }
}