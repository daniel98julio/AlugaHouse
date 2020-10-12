using System.Threading.Tasks;
using AlugaHouse.Domain;
using AlugaHouse.Repository.Interfaces;
using AlugaHouse.WebApi.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlugaHouse.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class ResidenceTypeController : ControllerBase
    {
        private readonly IAlugaHouseRepository _repo;

        public ResidenceTypeController(IAlugaHouseRepository repo)
        {
            _repo = repo;
        }
        
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllResidenceTypesAsync();

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ResidenceType residenceType)
        {
            try
            {
                _repo.Add(residenceType);

                if(await _repo.SaveChangesAsync()){
                    return Created($"/api/ResidenceType/{residenceType.ResidenceTypeId}", residenceType);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }

            return BadRequest();
        }

        [HttpPut("{residenceTypeId}")]
        public async Task<IActionResult> Put(int residenceTypeId, ResidenceType residenceType)
        {
            try
            {
                residenceType.ResidenceTypeId = residenceTypeId;
                var upd = await _repo.GetResidenceTypeAsyncById(residenceTypeId);
                if (upd == null) {
                    return NotFound();
                }

                _repo.Update(residenceType);

                if(await _repo.SaveChangesAsync()){
                    return Created($"/api/ResidenceType/{residenceType.ResidenceTypeId}", residenceType);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }

            return BadRequest();
        }

        [HttpDelete("{residenceTypeId}")]
        public async Task<IActionResult> Delete(int residenceTypeId)
        {
            try
            {
                var residenceType = await _repo.GetResidenceTypeAsyncById(residenceTypeId);
                if (residenceType == null) {
                    return NotFound();
                }

                _repo.Delete(residenceType);

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