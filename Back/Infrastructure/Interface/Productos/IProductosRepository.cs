using catalogo_de_productos.Models;
using Transversal.Dto.Productos;

namespace Infrastructure.Interface.Productos
{
    public interface IProductosRepository
    {
        Task<IEnumerable<Producto>> GetProductos();
        Task<Producto> GetProductoById(int id);
        Task<bool> UpdateProducto(int id, Producto producto);
        Task<CreateProductoDto> CreateProducto(Producto producto);
        Task<bool> DeleteProducto(int id);
    }
}
