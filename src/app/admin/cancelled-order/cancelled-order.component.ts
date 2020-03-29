import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancelled-order',
  templateUrl: './cancelled-order.component.html',
  styleUrls: ['./cancelled-order.component.css']
})
export class CancelledOrderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onBack(){
    this.router.navigate(['admin']);
  }

}
