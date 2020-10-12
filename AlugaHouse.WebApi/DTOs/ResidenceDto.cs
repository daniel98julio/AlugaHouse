namespace AlugaHouse.WebApi.DTOs
{
    public class ResidenceDto
    {
        public int ResidenceId { get; set; }
        public string ZipCode { get; set; }        
        public string StreetAddress { get; set; }
        public int NumberAddress { get; set; }
        public string Complement { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public bool Rented { get; set; }
        public int ResidenceTypeId {get; set;}    
    }
}