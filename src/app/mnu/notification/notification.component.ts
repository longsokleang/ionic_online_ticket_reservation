import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  onBtnBackClicked() {
    this.navCtrl.back();
  }
}
