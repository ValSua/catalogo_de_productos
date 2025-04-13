import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GetProductoDto } from '../../../models/producto/get-producto-dto';
import { ProductoService } from '../../../services/producto/producto.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

export interface Section {
  date: string;
  name: string;
  position: string;
  event: string;
  eventDesc: string;
  detail: string;
}

@Component({
  selector: 'app-producto-detail',
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule
  ],
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css'
})
export class ProductoDetailComponent implements OnInit {

  dataSource!: GetProductoDto;
  generalOpenState: boolean = false;
  contentLoaded: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: number, private productoService: ProductoService,
  ) {}

  ngOnInit() {

    this.productoService.getProductoById(this.data).subscribe(response => {
      this.dataSource = response;
      this.contentLoaded = false;
    })
  }
}


