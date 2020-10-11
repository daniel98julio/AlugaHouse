using System.Threading.Tasks;
using AlugaHouse.Domain;
using AlugaHouse.Repository.Constants;
using AlugaHouse.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlugaHouse.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class ResidenceController : ControllerBase
    {
        private readonly IAlugaHouseRepository _repo;

        public ResidenceController(IAlugaHouseRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllResidencesAsync();

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }
        }

        [HttpGet("{residenceId}")]
        public async Task<IActionResult> Get(int residenceId)
        {
            try
            {
                var results = await _repo.GetResidenceAsyncById(residenceId);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }
        }

        [HttpGet("getByZipCode/{zipCode}")]
        public async Task<IActionResult> Get(string zipCode)
        {
            try
            {
                var results = await _repo.GetResidenceAsyncByZipCode(zipCode);

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Residence residence)
        {
            try
            {
                _repo.Add(residence);

                if(await _repo.SaveChangesAsync()){
                    return Created($"/api/Residence/{residence.ResidenceId}", residence);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }

            return BadRequest();
        }

        [HttpPut("{residenceId}")]
        public async Task<IActionResult> Put(int residenceId, Residence residence)
        {
            try
            {
                residence.ResidenceId = residenceId;
                var upd = await _repo.GetResidenceAsyncById(residenceId);
                if (upd == null) return NotFound();

                _repo.Update(residence);

                if(await _repo.SaveChangesAsync()){
                    return Created($"/api/Residence/{residence.ResidenceId}", residence);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }

            return BadRequest();
        }

        [HttpDelete("{residenceId}")]
        public async Task<IActionResult> Delete(int residenceId)
        {
            try
            {
                var residence = await _repo.GetResidenceAsyncById(residenceId);
                if (residence == null) return NotFound();

                _repo.Delete(residence);

                if(await _repo.SaveChangesAsync()){
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }

            return BadRequest();
        }
    }
}