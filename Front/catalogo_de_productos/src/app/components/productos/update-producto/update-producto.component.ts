import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetProductoDto } from '../../../models/producto/get-producto-dto';
import { ProductoService } from '../../../services/producto/producto.service';
import { UpdateProductoDto } from '../../../models/producto/update-producto-dto';

@Component({
  selector: 'app-update-producto',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './update-producto.component.html',
  styleUrl: './update-producto.component.css'
})
export class UpdateProductoComponent implements OnInit {

  loading: boolean = false;
  listPath = 'list-productos';
  error: string | null = null;
  producto: GetProductoDto | null = null;
  productoId!: number;
  updateProducto!: UpdateProductoDto;

  constructor(
    private productoService: ProductoService, private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const parsedId = parseInt(id, 10); 

      if (!isNaN(parsedId)) {
        this.getProductoById(parsedId); 
      } else {
        this.error = 'ID del producto no proporcionado';
        this.loading = false;
        this.isLoading.set(false);
      }
    }
  }

  isLoading: WritableSignal<boolean> = signal(true);

  getProductoById(id: number): void {
    this.loading = true;
    this.error = null;

    this.productoService.getProductoById(id).subscribe({
      next: (response: GetProductoDto) => {
        this.producto = response;

        this.productoId = response.productoId;

        this.updateProducto = {
          productoId: response.productoId,
          nombre: response.nombre,
          descripcion: response.descripcion,
          precio: response.precio,
          stock: response.stock
        };

        this.loading = false;
        this.isLoading.set(false);
      },
      error: (err) => {
        if (err.status === 404) {
          this.error = 'Producto no encontrado';
        } else {
          this.error = 'Error al cargar el producto';
        }
        this.loading = false;
        this.isLoading.set(false);
        console.error('Error en la solicitud:', err);
      },
    });
  }

  deshabilitarGuardar(): boolean {
    return !this.updateProducto.precio || this.updateProducto.precio <= 0 
    || !this.updateProducto.stock || this.updateProducto.stock <= 0;
  }

  guardarCambios() {
    if (!this.productoId) {
      this.error = 'ID del producto no válido.';
      return;
    }

    this.productoService.updateProducto(this.productoId, this.updateProducto).subscribe({
      next: () => {
        alert('Producto actualizado correctamente');
        this.router.navigate([this.listPath]);
      },
      error: (err) => {
        this.error = 'Error al actualizar el producto.';
        console.error(err);
      },
    });
  }

  cancelar() {
    this.router.navigate([this.listPath]);
  }
}
