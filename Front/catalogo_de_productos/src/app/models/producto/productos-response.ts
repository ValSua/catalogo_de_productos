import { Producto } from "./producto";

export interface ProductosResponse {
    isSuccess: boolean;
    result: Producto[];
    message: string;
}
