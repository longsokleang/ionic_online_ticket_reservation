import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.scss'],
})
export class MyTripsComponent implements OnInit {

  segment: string;

  constructor() {
    this.segment = 'upcoming';
  }

  ngOnInit() {}

}
