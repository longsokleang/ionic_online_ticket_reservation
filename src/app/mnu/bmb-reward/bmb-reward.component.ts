import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bmb-reward',
  templateUrl: './bmb-reward.component.html',
  styleUrls: ['./bmb-reward.component.scss'],
})
export class BmbRewardComponent implements OnInit {

  segment: number;
  constructor() { 
    this.segment = 0;
  }

  ngOnInit() {}

}
