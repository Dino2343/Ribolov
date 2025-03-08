using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RibaController : ControllerBase
    {

        // koristimo dependency injection
        // 1. definiramo privatno svojstvo
        private readonly EdunovaContext _context;

        // koristimo dependency injection
        // 2. proslijediš instancu kroz konstruktor
        public RibaController(EdunovaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Ribe);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra) {
            try
            {
                var s = _context.Ribe.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                return Ok(s);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPost]
        public IActionResult Post(Riba smjer)
        {
            try
            {
                _context.Ribe.Add(smjer);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, smjer);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Riba zanr)
        {
            try
            {

                var s = _context.Ribe.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                s.Naziv = zanr.Naziv;

                _context.Ribe.Update(s);
                _context.SaveChanges();
                return Ok(new { poruka= "Uspješno promijenjeno" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            try
            {
                var s = _context.Ribe.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Ribe.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }




    }
}
