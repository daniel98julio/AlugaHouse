using System.Threading.Tasks;
using AlugaHouse.Domain;
using AlugaHouse.Repository.Interfaces;
using AlugaHouse.WebApi.DTOs;
using AlugaHouse.WebApi.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlugaHouse.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]    
    public class ResidenceController : ControllerBase
    {
        private readonly IAlugaHouseRepository _repo;
        private readonly IMapper _mapper;

        public ResidenceController(IAlugaHouseRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = _mapper.Map<ResidenceDto[]>(await _repo.GetAllResidencesAsync());

                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ResidenceDto residenceDto)
        {
            try
            {
                var residence = _mapper.Map<Residence>(residenceDto);

                //Validate data integrity in ViaCep Api
                residence = await _repo.GetAddressByViaCepApiAsync(residence);
                if(residence.ZipCode == null) return NotFound(ApiReturnMessages.ZipCodeNotFound);

                _repo.Add(residence);

                if(await _repo.SaveChangesAsync()){
                    return Created($"/api/Residence/{residence.ResidenceId}", residenceDto);
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ApiReturnMessages.DbFailed);
            }

            return BadRequest();
        }

        [HttpPut("{residenceId}")]
        public async Task<IActionResult> Put(int residenceId, ResidenceDto residence)
        {
            try
            {
                residence.ResidenceId = residenceId;

                var upd = await _repo.GetResidenceAsyncById(residenceId);
                if (upd == null) return NotFound();

                _mapper.Map(residence, upd);

                //Validate data integrity in ViaCep Api
                upd = await _repo.GetAddressByViaCepApiAsync(upd);
                if(upd.ZipCode == null) return NotFound(ApiReturnMessages.ZipCodeNotFound);

                _repo.Update(upd);

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