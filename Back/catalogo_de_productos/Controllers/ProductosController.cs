using Aplication.Interface.Productos;
using Microsoft.AspNetCore.Mvc;
using Transversal.Dto.Productos;
using Transversal.Helpers;

namespace catalogo_de_productos.Controllers
{
    [ApiController]
    public class ProductosController : ControllerBase
    {
        /// <summary>
        /// The productos service
        /// </summary>
        private readonly IProductosService _productosService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ProductosController"/> class.
        /// </summary>
        /// <param name="productosService">The productos service.</param>
        public ProductosController(IProductosService productosService)
        {
            _productosService = productosService;
        }

        /// <summary>
        /// Gets the productos.
        /// </summary>
        /// <returns></returns>
        [HttpGet(RoutesPath.Productos.GetProductos)]
        public async Task<IEnumerable<GetProductoDto>> GetProductos() => await _productosService.GetProductos();

        /// <summary>
        /// Gets the producto by identifier.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        [HttpGet(RoutesPath.Productos.GetProductoById)]
        public async Task<GetProductoDto> GetProductoById(int id) => await _productosService.GetProductoById(id);

        /// <summary>
        /// Updates the producto.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <param name="producto">The producto.</param>
        /// <returns></returns>
        [HttpPut(RoutesPath.Productos.UpdateProducto)]
        public async Task<bool> UpdateProducto(int id, UpdateProductoDto updateProductoDto) => await _productosService.UpdateProducto(id, updateProductoDto);

        /// <summary>
        /// Creates the producto.
        /// </summary>
        /// <param name="createProductoDto">The create producto dto.</param>
        /// <returns></returns>
        [HttpPost(RoutesPath.Productos.CreateProducto)]
        public async Task<CreateProductoDto> CreateProducto(CreateProductoDto createProductoDto) => await _productosService.CreateProducto(createProductoDto);

        /// <summary>
        /// Deletes the producto.
        /// </summary>
        /// <param name="id">The identifier.</param>
        /// <returns></returns>
        [HttpPut(RoutesPath.Productos.DeleteProducto)]
        public async Task<bool> DeleteProducto(int id) => await _productosService.DeleteProducto(id);

    }
}
