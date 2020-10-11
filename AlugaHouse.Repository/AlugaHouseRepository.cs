using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AlugaHouse.Domain;
using AlugaHouse.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace AlugaHouse.Repository
{
    public class AlugaHouseRepository : IAlugaHouseRepository
    {
        private HttpClient _client;
        private readonly AlugaHouseContext _context;

        public AlugaHouseRepository([FromServices]IHttpClientFactory httpClientFactory, AlugaHouseContext context){
            _client = httpClientFactory.CreateClient("ViaCepApi");
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        //WebApi General
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0; 
        }

        //ViaCep Api
        public async Task<SearchZipCode> GetAddressByViaCepApiAsync(string zipCode)
        {
            var response = await _client.GetAsync($"/ws/{zipCode}/json");
            response.EnsureSuccessStatusCode();
            string contents =
                response.Content.ReadAsStringAsync().Result;
            dynamic results =
                JsonConvert.DeserializeObject(contents);

            SearchZipCode search = new SearchZipCode();                
            search.ZipCode = results.cep;
            search.StreetAddress = results.logradouro;
            search.Complement = results.complemento;
            search.Neighborhood = results.bairro;
            search.City = results.localidade;
            search.State = results.uf;

            return search;
        }

        //Residence
        public async Task<Residence[]> GetAllResidencesAsync()
        {
            IQueryable<Residence> query = _context.Residences;

            query = query.OrderBy(r => r.ResidenceId);

            return await query.ToArrayAsync();
        }

        public async Task<Residence> GetResidenceAsyncById(int residenceId)
        {
            IQueryable<Residence> query = _context.Residences;

            query = query.OrderBy(r => r.ZipCode)
                .Where(r => r.ResidenceId == residenceId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Residence[]> GetResidenceAsyncByZipCode(string zipCode)
        {
            IQueryable<Residence> query = _context.Residences;

            query = query.OrderBy(r => r.ZipCode)
                .Where(r => r.ZipCode == zipCode);

            return await query.ToArrayAsync();
        }

        //ResidenceType
        public async Task<ResidenceType[]> GetAllResidenceTypesAsync()
        {
            IQueryable<ResidenceType> query = _context.ResidenceTypes;

            query = query.OrderBy(r => r.ResidenceTypeId);

            return await query.ToArrayAsync();
        }

        public async Task<ResidenceType> GetResidenceTypeAsyncById(int residenceTypeId)
        {
            IQueryable<ResidenceType> query = _context.ResidenceTypes;

            query = query.OrderBy(r => r.ResidenceTypeId)
                .Where(r => r.ResidenceTypeId == residenceTypeId);

            return await query.FirstOrDefaultAsync();
        }
    }
}