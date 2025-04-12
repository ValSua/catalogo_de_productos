using Transversal.Dto.Productos;

namespace Aplication.Interface.Productos
{
    public interface IProductosService
    {
        Task<IEnumerable<GetProductoDto>> GetProductos();
        Task<GetProductoDto> GetProductoById(int id);
        Task<bool> UpdateProducto(int id, UpdateProductoDto updateProductoDto);
        Task<CreateProductoDto> CreateProducto(CreateProductoDto createProductoDto);
        Task<bool> DeleteProducto(int id);
    }
}
