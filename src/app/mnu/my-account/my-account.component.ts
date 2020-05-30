import { Component, OnInit } from '@angular/core';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {

  username: string;
  userInfo: any;
  profileAvataAsLetter: string;
  progress: number;
  util = new Util();
  constructor() {
    this.username = this.util.getSecureStorage('userID');
    this.userInfo = this.util.getSecureStorage('userInfo');
    this.profileAvataAsLetter = this.userInfo.username.substr(0, 1).toUpperCase();
    if (!this.profileAvataAsLetter) {
      this.profileAvataAsLetter = 'S';
    }
    this.progress = 5;
  }

  ngOnInit() {}

}
