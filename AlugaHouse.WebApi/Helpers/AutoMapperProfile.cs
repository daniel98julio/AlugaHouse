using AlugaHouse.Domain;
using AlugaHouse.WebApi.DTOs;
using AutoMapper;

namespace AlugaHouse.WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Residence, ResidenceDto>().ReverseMap();
        }
    }
}