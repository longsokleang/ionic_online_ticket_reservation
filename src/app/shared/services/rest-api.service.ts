import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Util } from '../util';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  serverUrl: string;
  util = new Util();

  constructor(
    private httpClient: HttpClient,
    private alertCtrl: AlertController
  ) {
    this.serverUrl = environment.server;
  }

  async request(api: string, id?:number) {  
    const validToken = this.util.getSecureStorage('valid_token');
    const headerOption = {
      headers: new HttpHeaders().set('x-access-token', validToken)
    }
    let endpoint: string
    if (id) {
      endpoint = this.serverUrl + api + '/' + id
    } else {
      endpoint = this.serverUrl + api;
    }
    return this.httpClient.get(endpoint , headerOption);
  }

  checkHeader(header: any) {
    if (!header.result) {
      this.alert(header);
      return false;
    } else {
      return true;
    }
  }

  async alert(header: any) {
    let msg = header.result_msg;
    let alert = await this.alertCtrl.create({
      // header: e.name,
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
