using catalogo_de_productos.Data;
using catalogo_de_productos.Models;
using Infrastructure.Interface.Productos;
using Microsoft.EntityFrameworkCore;
using Transversal.Dto.Productos;

namespace Infrastructure.Implements.Productos
{
    public class ProductosRepository : IProductosRepository
    {
        private readonly CatalogoDbContext _context;

        public ProductosRepository(CatalogoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Producto>> GetProductos()
        {
            try
            {
                var productos = await _context.Productos
                            .Where(a => !a.IsDeleted)
                            .ToListAsync();
                return productos;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }

        }

        public async Task<Producto> GetProductoById(int id)
        {
            try
            {
                var producto = await _context.Productos
                              .FirstOrDefaultAsync(a => a.ProductoId == id);

                if (producto == null)
                    throw new KeyNotFoundException($"No se encontró un producto con ID {id}.");

                return producto;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public async Task<bool> UpdateProducto(int id, Producto producto)
        {
            if (id != producto.ProductoId)
            {
                return false;
            }

            _context.Entry(producto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductoExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }

            return true;
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.ProductoId == id);
        }

        public async Task<CreateProductoDto> CreateProducto(Producto producto)
        {
            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return new CreateProductoDto
            {
                ProductoId = producto.ProductoId,
                Nombre = producto.Nombre,
                Descripcion = producto.Descripcion,
                Precio = producto.Precio,
                Stock = producto.Stock
            };
        }

        public async Task<bool> DeleteProducto(int id)
        {
            var producto = await _context.Productos
                .FirstOrDefaultAsync(p => p.ProductoId == id);

            if (producto == null)
            {
                return false;
            }

            producto.IsDeleted = true;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
