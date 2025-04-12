using System;
using System.Collections.Generic;

namespace catalogo_de_productos.Models;

public partial class Producto
{
    public int ProductoId { get; set; }

    public string Nombre { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public decimal Precio { get; set; }

    public int Stock { get; set; }

    public bool IsDeleted { get; set; }
}
