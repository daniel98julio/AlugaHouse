using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
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

        //Deserialize for ViaCep Api consults
        private async Task<dynamic> DeserializeViaCepReturn(string zipCode)
        {
            int zip = int.Parse(Regex.Replace(zipCode, @"[^\d]", ""));

            var response = await _client.GetAsync($"/ws/{zip}/json");
            response.EnsureSuccessStatusCode();
            string contents =
                response.Content.ReadAsStringAsync().Result;
            dynamic results =
                JsonConvert.DeserializeObject(contents);
            return results;
        }

        //ViaCep Api
        public async Task<SearchZipCode> GetAddressByViaCepApiAsync(string zipCode)
        {
            dynamic results = await DeserializeViaCepReturn(zipCode);

            SearchZipCode search = new SearchZipCode();
            search.ZipCode = results.cep;
            search.StreetAddress = results.logradouro;
            search.Complement = results.complemento;
            search.Neighborhood = results.bairro;
            search.City = results.localidade;
            search.State = results.uf;

            return search;
        }

        public async Task<Residence> GetAddressByViaCepApiAsync(Residence residence)
        {
            dynamic results = await DeserializeViaCepReturn(residence.ZipCode);
              
            residence.ZipCode = results.cep;
            residence.StreetAddress = results.logradouro;
            residence.Complement = results.complemento;
            residence.Neighborhood = results.bairro;
            residence.City = results.localidade;
            residence.State = results.uf;

            return residence;
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