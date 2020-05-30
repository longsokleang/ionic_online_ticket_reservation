import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private alertCtrl: AlertController
  ) { }

  async alert(msg: string) {
    let alert = await this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  async confirm(msg: any, callBack: Function) {
    let alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Confirm',
          cssClass: 'secondary',
          handler: () => {
            callBack();
          }
        }, {
          text: 'Cancel',
          handler: () => {
           this.alertCtrl.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
}
