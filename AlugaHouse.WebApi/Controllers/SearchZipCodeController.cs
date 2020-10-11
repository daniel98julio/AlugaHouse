using System.Threading.Tasks;
using AlugaHouse.Repository.Constants;
using AlugaHouse.Repository.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlugaHouse.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchZipCodeController : ControllerBase
    {
        private readonly IAlugaHouseRepository _repo;

        public SearchZipCodeController(IAlugaHouseRepository repo)
        {
            _repo = repo;
        }
        
        [HttpGet("{zipCode}")]
        public async Task<IActionResult> Get(string zipCode)
        {
            try
            {
                var results = await _repo.GetAddressByViaCepApiAsync(zipCode);
                if (results.ZipCode == null) {
                    return this.StatusCode(StatusCodes.Status404NotFound, ApiReturnMessages.ZipCodeNotFound);
                }

                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed + ex.Message);
            }
        }
    }
}