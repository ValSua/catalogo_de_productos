import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { CreateProductoDto } from '../../models/producto/create-producto-dto';
import { GetProductoDto } from '../../models/producto/get-producto-dto';
import { ProductosResponse } from '../../models/producto/productos-response';
import { UpdateProductoDto } from '../../models/producto/update-producto-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = environment.baseUrl;
  private productosUrl = `${this.baseUrl}/productos`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(
      `${this.productosUrl}/getProductos`);
  }

  getProductoById(id: string): Observable<GetProductoDto> {
    return this.http.get<GetProductoDto>(
      `${this.productosUrl}/getProductoById/${id}`);
  }

  createProducto(createProducto: CreateProductoDto): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${this.productosUrl}/createProducto`,
      createProducto
    );
  }

  updateProducto(id: string, updateProducto: UpdateProductoDto): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.productosUrl}/updateProducto/${id}`,
      updateProducto
    );
  }

  deleteProducto(id: string): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      `${this.productosUrl}/deleteProducto/${id}`,
      {}
    );
  }
}
