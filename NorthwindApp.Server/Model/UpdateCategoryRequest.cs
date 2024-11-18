using System.ComponentModel.DataAnnotations;

namespace NorthwindApp.Server.Model
{
    public class UpdateCategoryRequest
    {
        [Required(ErrorMessage = "Required field")]
        [MinLength(1, ErrorMessage = "Name must be 1 character")]
        [MaxLength(40, ErrorMessage = "Name cannot be over 40 characters")]
        [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$",ErrorMessage = "Characters are not allowed.")]
        public string CategoryName { get; set; }

        [MaxLength(100, ErrorMessage = "Name cannot be over 100 characters")]
        public string Description { get; set; }
    }
}
