export interface GetProductoDto {
    productoId: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    isDeleted: boolean;
}
