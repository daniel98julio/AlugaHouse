using System.Net.Http;
using System.Threading.Tasks;
using AlugaHouse.Domain;
using AlugaHouse.Repository.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AlugaHouse.Repository
{
    public class AlugaHouseRepository : IAlugaHouseRepository
    {
        private HttpClient _client;
        public AlugaHouseRepository([FromServices]IHttpClientFactory httpClientFactory){
            _client = httpClientFactory.CreateClient("ViaCepApi");
        }

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
    }
}