# Catálogo de Productos - Prueba Técnica
Este proyecto es una aplicación web para gestionar un catálogo de productos con operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Incluye un backend con .NET Web API, un frontend con Angular 19, y una base de datos relacional en SQL Server gestionada con Entity Framework Core. La aplicación cumple con los requisitos funcionales (CRUD, validaciones en cliente y servidor) y técnicos, además de incluir una API REST y dockerización local.
**Tecnologías utilizadas**:
- Backend: .NET 8 (C#, DDD, Web API)
- Frontend: Angular, HTML, CSS, TypeScript
- Base de datos: SQL Server
- ORM: Entity Framework Core
- Control de versiones: Git
- Contenedores: Docker (local)

## Requisitos Previos
- [.NET 8 SDK](https://dotnet.microsoft.com/download) 8.0 o superior
- [SQL Server 22](https://www.microsoft.com/es-es/sql-server/sql-server-downloads) 
- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)(opcional, para dockerización)
- Navegador web moderno (Chrome, Firefox, etc.)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) 

## Instalación
1. Clona el repositorio:
   en una terminal o cmd
   git clone <URL-del-repositorio>
2. Navega al directorio del proyecto:
    cd catalogo_de_productos
3. Instalar dependencias
   Front:
   cd Front/catalogo_de_productos
   npm install
   Back:
   dotnet restore
## Configuración
1. Base de datos
   - La base de datos actualmente se encuentra desplegada en un recurso de Azure SQL. La cadena de conexión está en `appsettings.json`. Contacta al administrador para obtener las credenciales (server: `tcp:webseriesinstance.database.windows.net,1433`).
   - Si requieres realizar la conexión localmente, Crea una base de datos local llamada `catalogoDb` en SQL Server.
     - Actualiza la cadena de conexión en `Back/catalogo_de_productos/appsettings.json`:
1. Base de datos (Docker)
   Para ejecutar la aplicación con el contenedor de docker, la base de datos debe estar configurada por separado, ya que este contenedor no incluye un servicio de base de datos embebido.
   En el server localhost,1433 crear la  una base de datos con el nombre catalogoDb y crear una tabla llamada Productos. Las credenciales de acceso se encuentran en el archivo docker-compose.yml
   
CREATE TABLE [dbo].[Productos](
	[ProductoId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Descripcion] [nvarchar](max) NOT NULL,
	[Precio] [decimal](10, 2) NOT NULL,
	[Stock] [int] NOT NULL,
	[IsDeleted] [bit] NOT NULL,
 CONSTRAINT [PK_Productos] PRIMARY KEY CLUSTERED 
(
	[ProductoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

## Ejecución
Opción 1. Docker 
   - Navegar a la ruta raiz del proyecto
   - Ejecutar docker-compose up --build -d (Asegúrate de que la base de datos esté configurada)
   - La aplicación estará disponible en http://localhost:80 y la api en http://localhost:8080/swagger/index.html
Opción 2 . Correr Back y Front 
   - En el back, correr el proyecto catalogo_de_productos
   - En el front, abrir una terminal y ejecutar ng serve
   - La api estará disponible en https://localhost:44397/swagger/index.html y la aplicación en http://localhost:4200/
## Instrucciones de Uso
- Interfaz de Usuario
  1. Listado de Productos:
  Accede a la página principal (/home) para ver la página de bienvenida. Da click en el botón "Ver Productos" para ver la lista de productos con su ID, nombre, precio, stock y una columna de acciones.
  Haz clic en "Ver detalle" para ver la información completa de un producto.
  2. Crear un Producto:
  Da click en el botón "Agregar producto" de la parte superior derecha.
  Completa el formulario (nombre, descripción, precio, stock).
  Las validaciones en cliente aseguran que los campos sean válidos.
  3. Editar un Producto:
  Desde el listado, selecciona "Editar" en un producto.
  Modifica los campos en el formulario y guarda los cambios.
  4. Eliminar un Producto:
  En el listado selecciona "Eliminar".
  Confirma la acción en el diálogo emergente para evitar eliminaciones accidentales.
  Por temas de trazabilidad, se manejó un eliminado lógico, más no físico. Se visualizará el campo IsDeleted en 1 al eliminar el producto.
  6. Detalles del Producto:
  Selecciona "Ver detalle" en el listado para ver toda la información del producto en un modal.
- API Rest
  La aplicación incluye una API REST para gestionar productos. Los endpoints disponibles son:
  1. Listar productos api/productos/getProductos
     Respuesta: 
       {
        "productoId": 0,
        "nombre": "string",
        "descripcion": "string",
        "precio": 0,
        "stock": 0,
        "isDeleted": false
      }
  2. Obtener un producto por Id api/productos/getProductoById/{id:int}
     Respuesta: 
       {
        "productoId": 0,
        "nombre": "string",
        "descripcion": "string",
        "precio": 0,
        "stock": 0,
        "isDeleted": false
      }
  3. Crear un producto api/productos/createProducto
     Cuerpo:
       {
        "nombre": "Teclado",
        "descripcion": "Teclado mecánico",
        "precio": 89.99,
        "stock": 50
       }
     Respuesta: 
       {
        "productoId": 3,
        "nombre": "Teclado",
        "descripcion": "Teclado mecánico",
        "precio": 89.99,
        "stock": 50
      }
  4. Actualizar un producto api/productos/updateProducto/{id:int}
     Cuerpo:
       {
        "productoId": 3,
        "nombre": "Teclado",
        "descripcion": "Teclado mecánico",
        "precio": 89.99,
        "stock": 50
       }
     Respuesta:
     true
  6. Eliminar un producto api/productos/deleteProducto/{id:int}
     Recibe: id
     Respuesta: true
## Notas adicionales
**Pruebas unitarias**: No se implementaron por limitaciones de tiempo.
**Despliegue**: La dockerización se limita a entornos locales. Se implementó un despliegue mediante azure para la api https://catalogoproductosapi.azurewebsites.net/swagger/index.html y mediante vercel para el front https://catalogodeproductos.vercel.app.
