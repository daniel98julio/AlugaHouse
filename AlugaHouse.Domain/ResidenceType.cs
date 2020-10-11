using System.ComponentModel.DataAnnotations;

namespace AlugaHouse.Domain
{
    public class ResidenceType
    {
        public int ResidenceTypeId { get; set; }
        [Required]
        [StringLength(50)]
        public string ResidenceTypeName { get; set; }
    }
}