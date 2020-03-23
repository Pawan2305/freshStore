import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page-body',
  templateUrl: './main-page-body.component.html',
  styleUrls: ['./main-page-body.component.css']
})
export class MainPageBodyComponent implements OnInit {

  count = [0,1,2];

  constructor() { }

  ngOnInit(): void {
  }

}
