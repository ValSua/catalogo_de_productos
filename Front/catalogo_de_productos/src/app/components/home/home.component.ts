import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  loaded: boolean = true;

  constructor(
    private router: Router,
  ) {
    this.loaded = true;
  }

  ngOnInit(): void {
    
  }

  productos() {
    this.router.navigate(['/list-productos'])
  }

}
