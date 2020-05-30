import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit() {}

  back() {
    this.navCtrl.back();
  }

  async onBtnCreateAccountClicked() {
    await this.alert.alert('Account is created sucessfully!');
    this.router.navigateByUrl('/login');
  }

}
