using Aplication.Interface.Productos;
using catalogo_de_productos.Models;
using Infrastructure.Interface.Productos;
using Transversal.Dto.Productos;

namespace Aplication.Implements.Productos
{
    public class ProductosService : IProductosService
    {
        private readonly IProductosRepository _productosRepository;

        public ProductosService(IProductosRepository productosRepository)
        {
            _productosRepository = productosRepository;
        }

        public async Task<IEnumerable<GetProductoDto>> GetProductos()
        {
            var result = await _productosRepository.GetProductos();

            var productoMapped = AutoMapperConfig.GetMapper<Producto, GetProductoDto>().Map<IEnumerable<GetProductoDto>>(result);

            return productoMapped;
        }

        public async Task<GetProductoDto> GetProductoById(int id)
        {
            var result = await _productosRepository.GetProductoById(id);

            var productoMapped = AutoMapperConfig.GetMapper<Producto, GetProductoDto>().Map<GetProductoDto>(result);

            return productoMapped;
        }

        public async Task<bool> UpdateProducto(int id, UpdateProductoDto updateProductoDto)
        {
            var productoMapped = AutoMapperConfig.GetMapper<UpdateProductoDto, Producto>().Map<Producto>(updateProductoDto);
            productoMapped.ProductoId = id;

            var result = await _productosRepository.UpdateProducto(id, productoMapped);
            return result;
        }

        public async Task<CreateProductoDto> CreateProducto(CreateProductoDto createProductoDto)
        {
            var productoMapped = AutoMapperConfig.GetMapper<CreateProductoDto, Producto>().Map<Producto>(createProductoDto);

            var result = await _productosRepository.CreateProducto(productoMapped);

            return result;
        }

        public async Task<bool> DeleteProducto(int id)
        {
            var result = await _productosRepository.DeleteProducto(id);
            return result;
        }
    }
}
