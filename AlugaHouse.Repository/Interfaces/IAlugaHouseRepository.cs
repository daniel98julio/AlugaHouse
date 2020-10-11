using System.Threading.Tasks;
using AlugaHouse.Domain;

namespace AlugaHouse.Repository.Interfaces
{
    public interface IAlugaHouseRepository
    {        
        //WebApi General
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveChangesAsync();

        //ViaCep Api
         Task<SearchZipCode> GetAddressByViaCepApiAsync(string zipCode);

        //Residence
         Task<Residence[]> GetAllResidencesAsync();
         Task<Residence[]> GetResidenceAsyncByZipCode(string zipCode);
         Task<Residence> GetResidenceAsyncById(int residenceId);

        //ResidenceType
         Task<ResidenceType[]> GetAllResidenceTypesAsync();
         Task<ResidenceType> GetResidenceTypeAsyncById(int residenceId);         
    }
}