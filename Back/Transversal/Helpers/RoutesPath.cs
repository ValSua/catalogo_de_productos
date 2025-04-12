namespace Transversal.Helpers
{
    /// <summary>
    ///  Class RoutesPath
    /// </summary>
    public class RoutesPath
    {
        /// <summary>
        /// The controller
        /// </summary>
        public const string Controller = "Controller";
        /// <summary>
        /// The action
        /// </summary>
        public const string Action = "Action";
        /// <summary>
        /// 
        /// </summary>
        public static class Productos
        {
            /// <summary>
            /// The get productos
            /// </summary>
            public const string GetProductos = "api/productos/getProductos";
            /// <summary>
            /// The get producto by identifier
            /// </summary>
            public const string GetProductoById = "api/productos/getProductoById/{id:int}";
            /// <summary>
            /// The create producto
            /// </summary>
            public const string CreateProducto = "api/productos/createProducto";
            /// <summary>
            /// The update producto
            /// </summary>
            public const string UpdateProducto = "api/productos/updateProducto/{id:int}";
            /// <summary>
            /// The delete producto
            /// </summary>
            public const string DeleteProducto = "api/productos/deleteProducto/{id:int}";
        }
    }
}
