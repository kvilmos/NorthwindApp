using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;


namespace NorthwindApp.Server.Model;

public partial class Category
{

    public int CategoryId { get; set; }
    [Required (ErrorMessage = "Field is required!")]
    [MinLength(1, ErrorMessage = "Name must be 1 character!")]
    [MaxLength(40, ErrorMessage = "Name cannot be over 40 characters!")]
    [RegularExpression(@"^[a-zA-Z''-'\s]{1,40}$", ErrorMessage = "Characters are not allowed!")]

    public string CategoryName { get; set; } = null!;
    [MaxLength(100, ErrorMessage = "Description cannot be over 100 characters!")]
    public string? Description { get; set; }


    [JsonIgnore]
    public byte[]? Picture { get; set; }
    [JsonIgnore]
    public virtual ICollection<Product>? Products { get; set; } = new List<Product>();
}
