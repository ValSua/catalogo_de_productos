import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { GetProductoDto } from '../../../models/producto/get-producto-dto';
import { Producto } from '../../../models/producto/producto';
import { ProductoService } from '../../../services/producto/producto.service';
import { ApiResponse } from '../../../models/api-response';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductoDetailComponent } from '../producto-detail/producto-detail.component';

@Component({
  selector: 'app-list-productos',
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  templateUrl: './list-productos.component.html',
  styleUrl: './list-productos.component.css'
})
export class ListProductosComponent implements OnInit{

  edithPath = 'updateProducto';
  createPath = 'createProducto';

  constructor(
    private productoService: ProductoService, private dialog: MatDialog, 
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  public productos: WritableSignal<GetProductoDto[]> = signal([]);

  isLoading: WritableSignal<boolean> = signal(true);

  getAll() {
    this.productoService.getProductos().subscribe({
      next: (response: any) => {
        const productosArray: Producto[] = Array.isArray(response) ? response : [];
        
        this.productos.set(productosArray);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al obtener los productos', err);
        this.isLoading.set(false);
        this.productos.set([]);
      }
    });
  }

  openProductoEdit(id: number) {
    this.router.navigate([this.edithPath, id]);
  }

  openProductoDetail(id: number) {
    this.dialog.open(ProductoDetailComponent, {data: id, disableClose: true}); 
  }

  openProductoCreate() {
    this.router.navigate([this.createPath]);
  }

  eliminarProducto(id: number) {
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      this.productoService.deleteProducto(id).subscribe({
        next: (response: ApiResponse) => {
          if (response) {
            alert(`Producto eliminado con exito`);
            this.getAll();
          } 
        },
        error: (err) => {
          console.error('Error en la solicitud de eliminación:', err);
          alert('Ocurrió un error al intentar eliminar el producto');
        }
      });
    }
  }
}
