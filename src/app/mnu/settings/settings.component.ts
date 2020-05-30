import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MenuController } from '@ionic/angular';
import { Util } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  util = new Util();
  constructor(
    private alert: AlertService,
    private menuCtrl: MenuController,
    private router: Router
  ) { }

  ngOnInit() {}

  onBtnLogoutClicked() {
    this.alert.confirm(
      'Are you sure to logout?',
      () => {
        console.log('onBtnLogoutClicked');
        this.util.removeSecureStorage('userInfo');
        this.router.navigateByUrl('/menu', {replaceUrl: true})
      });
  }

}
