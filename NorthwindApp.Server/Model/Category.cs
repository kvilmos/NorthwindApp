using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;


namespace NorthwindApp.Server.Model;

public partial class Category
{

    public int CategoryId { get; set; }
    [Required]
    [MinLength(1, ErrorMessage = "Name must be 1 character")]
    [MaxLength(40, ErrorMessage = "Name cannot be over 40 characters")]
    public string CategoryName { get; set; } = null!;
    [MaxLength(100, ErrorMessage = "Name cannot be over 100 characters")]
    public string? Description { get; set; }
    public byte[]? Picture { get; set; }


    [JsonIgnore]
    public virtual ICollection<Product>? Products { get; set; } = new List<Product>();
}
