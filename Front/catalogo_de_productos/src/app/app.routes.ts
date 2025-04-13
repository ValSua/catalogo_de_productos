import { Routes } from '@angular/router';
import { AppComponent } from './components/principal/app.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { HomeComponent } from './components/home/home.component';
import { CreateProductoComponent } from './components/productos/create-producto/create-producto.component';
import { UpdateProductoComponent } from './components/productos/update-producto/update-producto.component';

export const routes: Routes = [
    {path: 'app-root', component: AppComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'list-productos', component: ListProductosComponent},
    {path: 'createProducto', component: CreateProductoComponent},
    {path: 'updateProducto/:id', component: UpdateProductoComponent},
];
