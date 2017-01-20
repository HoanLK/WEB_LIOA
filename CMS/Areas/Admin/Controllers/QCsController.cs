using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class QCsController : Controller
    {
        private LioaEntities db = new LioaEntities();

        // GET: Admin/QCs
        public ActionResult Index()
        {
            return View(db.QC.ToList());
        }

        // GET: Admin/QCs/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            QC qC = db.QC.Find(id);
            if (qC == null)
            {
                return HttpNotFound();
            }
            return View(qC);
        }

        // GET: Admin/QCs/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/QCs/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "id,title,link,image")] QC qC)
        {
            if (ModelState.IsValid)
            {
                db.QC.Add(qC);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(qC);
        }

        // GET: Admin/QCs/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            QC qC = db.QC.Find(id);
            if (qC == null)
            {
                return HttpNotFound();
            }
            return View(qC);
        }

        // POST: Admin/QCs/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,title,link,image")] QC qC)
        {
            if (ModelState.IsValid)
            {
                db.Entry(qC).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(qC);
        }

        // GET: Admin/QCs/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            QC qC = db.QC.Find(id);
            if (qC == null)
            {
                return HttpNotFound();
            }
            return View(qC);
        }

        // POST: Admin/QCs/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            QC qC = db.QC.Find(id);
            db.QC.Remove(qC);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
