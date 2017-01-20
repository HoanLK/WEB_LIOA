using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class QCAPIController : ApiController
    {
        private LioaEntities db = new LioaEntities();

        // GET: api/QCAPI
        public IQueryable<QC> GetQC()
        {
            return db.QC;
        }

        // GET: api/QCAPI/5
        [ResponseType(typeof(QC))]
        public IHttpActionResult GetQC(int id)
        {
            QC qC = db.QC.Find(id);
            if (qC == null)
            {
                return NotFound();
            }

            return Ok(qC);
        }

        // PUT: api/QCAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutQC(int id, QC qC)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != qC.id)
            {
                return BadRequest();
            }

            db.Entry(qC).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QCExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/QCAPI
        [ResponseType(typeof(QC))]
        public IHttpActionResult PostQC(QC qC)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.QC.Add(qC);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = qC.id }, qC);
        }

        // DELETE: api/QCAPI/5
        [ResponseType(typeof(QC))]
        public IHttpActionResult DeleteQC(int id)
        {
            QC qC = db.QC.Find(id);
            if (qC == null)
            {
                return NotFound();
            }

            db.QC.Remove(qC);
            db.SaveChanges();

            return Ok(qC);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool QCExists(int id)
        {
            return db.QC.Count(e => e.id == id) > 0;
        }
    }
}