﻿using System;
using System.Collections.Generic;

namespace NorthwindApp.Server.Model;

public partial class ProductsAboveAveragePrice
{
    public string ProductName { get; set; } = null!;

    public decimal? UnitPrice { get; set; }
}
