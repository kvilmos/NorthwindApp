using System.ComponentModel.DataAnnotations;

namespace NorthwindApp.Server.Model
{
    public class UpdateCategoryRequest
    {
        [Required]
        [MinLength(1, ErrorMessage = "Name must be 1 character")]
        [MaxLength(40, ErrorMessage = "Name cannot be over 40 characters")]
        public string CategoryName { get; set; }

        [MaxLength(100, ErrorMessage = "Name cannot be over 100 characters")]
        public string Description { get; set; }
        public byte[]? Picture { get; set; }
    }
}
