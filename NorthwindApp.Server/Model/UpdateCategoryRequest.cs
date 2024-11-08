using System.ComponentModel.DataAnnotations;

namespace NorthwindApp.Server.Model
{
    public class UpdateCategoryRequest
    {
        [Required]
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public byte[]? Picture { get; set; }
    }
}
