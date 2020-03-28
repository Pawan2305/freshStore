import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-product',
  templateUrl: './live-product.component.html',
  styleUrls: ['./live-product.component.css']
})
export class LiveProductComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate(['admin']);
  }

}
