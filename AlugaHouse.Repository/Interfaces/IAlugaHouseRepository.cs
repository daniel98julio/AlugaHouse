using System.Threading.Tasks;
using AlugaHouse.Domain;

namespace AlugaHouse.Repository.Interfaces
{
    public interface IAlugaHouseRepository
    {
         Task<SearchZipCode> GetAddressByViaCepApiAsync(string zipCode);
    }
}