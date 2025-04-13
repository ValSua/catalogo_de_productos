import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreateProductoDto } from '../../../models/producto/create-producto-dto';
import { ProductoService } from '../../../services/producto/producto.service';

@Component({
  selector: 'app-create-producto',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatDialogModule
  ],
  templateUrl: './create-producto.component.html',
  styleUrl: './create-producto.component.css'
})
export class CreateProductoComponent implements OnInit{

  loading: boolean = true; 
  listPath = 'list-productos';
  error: string | null = null;
  createProducto: CreateProductoDto = { 
    productoId: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0
  };

  constructor(
    private productoService: ProductoService, private router: Router,
  ) { }

  ngOnInit(): void {
    this.loading = false; 
  }

  isLoading: WritableSignal<boolean> = signal(true);

  guardarCambios() {
    this.productoService.createProducto(this.createProducto).subscribe({
      next: () => {
        alert('Producto creado correctamente');
        this.router.navigate([this.listPath]);
      },
      error: (err) => {
        this.error = 'Error al crear el producto.';
        console.error(err);
      },
    });
  }

  cancelar() {
    this.router.navigate([this.listPath]);
  }
}
