import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss'],
})
export class OperationComponent implements OnInit {

  segment: number;

  constructor() {
    this.segment = 0;
  }

  ngOnInit() {}

}
