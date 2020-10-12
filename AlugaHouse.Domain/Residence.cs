using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AlugaHouse.Domain
{
    public class Residence
    {
        public int ResidenceId { get; set; }
        [Required]
        [StringLength(9)]
        public string ZipCode { get; set; }
        [Required]
        [StringLength(70)]
        public string StreetAddress { get; set; }
        [Required]
        public int NumberAddress { get; set; }
        [StringLength(70)]
        public string Complement { get; set; }
        [Required]
        [StringLength(70)]
        public string Neighborhood { get; set; }
        [Required]
        [StringLength(70)]
        public string City { get; set; }
        [Required]
        [StringLength(2)]
        public string State { get; set; }
        public bool Rented { get; set; }
        public int ResidenceTypeId {get; set;}
        public virtual ResidenceType ResidenceType { get; set; }
    }
}