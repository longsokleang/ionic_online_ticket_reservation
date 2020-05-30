import { Component, OnInit } from '@angular/core';
import { User, AuthResponse } from './login.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Storage as Storages } from '@ionic/storage';
import { LOCAL_STORAGE } from 'src/app/shared/constants/common.const';
import { Util } from 'src/app/shared/util'
import { RestAPIService } from 'src/app/shared/services/rest-api.service';
import { NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataCenter } from 'src/app/shared/utils/data-center.static';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  serverUrl = environment.server;
  authSubject = new BehaviorSubject(false);
  util = new Util();
  isRemember: boolean;
  isBtnLoginEnable: boolean;
  isFromMenu: boolean;

  authenticated = false;
  constructor(
    private httpClient: HttpClient,
    private storage: Storages,
    private api: RestAPIService,
    private navCtrl: NavController,
    private router: Router,
    private menu: MenuController
  ) {
    this.isFromMenu = DataCenter.get('menu', 'isFromMenu');
    this.username = this.util.getSecureStorage('userID');
    if (this.username) {
      this.isRemember = true;
    }
  }

  ngOnInit() {
  }

  setAuthSate(authenticated) {
    if (authenticated) {
      console.log('setToken');
      this.storage.set('my_token', btoa(this.username + ":" + this.password)).then(() => {
      // this.storage.set('my_token', 'myspecialheadertoken123').then(() => {
        this.authenticated = true;
      })
    } else {
      this.storage.remove('my_token').then(() => {
        this.authenticated = false;
      })
    }
  }

  async reqLogin() {
    console.log('isRemember: ', this.isRemember);
    (await this.api.request('/login')).subscribe(res => {
      console.log("res: ", res);
      
      const result = this.api.checkHeader(res['header']);
      if (result) {
        this.util.setSecureStorage('valid_token', res['body'].token)
        this.util.setSecureStorage('userInfo', {username: this.username});
        if (this.isRemember) {
          this.util.setSecureStorage('userID', this.username);
        } else {
          this.util.removeSecureStorage('userID');
        }
        this.router.navigateByUrl('/menu', {replaceUrl: true});
      }
    });
  }

  async getUser() {  
    (await this.api.request('/api/user')).subscribe(res => {
      const result = this.api.checkHeader(res['header']);
      if (result) {
        console.log(result);
        
      }
    })
  }

  getUserDetail(id: number) {
    const validToken = this.util.getSecureStorage('valid_token');
    console.log(validToken);

    const headerOption = {
      headers: new HttpHeaders().set('x-access-token', validToken)
    }
    
    this.httpClient.get(this.serverUrl+'/api/user/' + id, headerOption).subscribe(res => {
      console.log(res);
    })
  }

  checkValidation() {
    if (!this.username || !this.password) {
      this.isBtnLoginEnable = false;
    } else {
      this.isBtnLoginEnable = true;
    }
  }

  login(): Observable<AuthResponse> {
    console.log('login clicked');
    let user: User = {
      id: 1,
      name: this.username,
      password: this.password,
      email: ''
    };
    // http://127.0.0.1:5000/login
    return this.httpClient.post(`${this.serverUrl}/login`, user).pipe(
      tap(async (res: AuthResponse) => {
        console.log('res: ', res);
        
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  back() {
    console.log('isFromMenu: ', this.isFromMenu);
    
    if (this.isFromMenu) {
      this.router.navigateByUrl('/menu', {replaceUrl: true});
    } else {
      this.navCtrl.back()
    }
    // this.menu.open();
  }

  onCheckBoxChange() {
    if (this.isRemember && this.username) {
      this.util.setSecureStorage('userID', this.username);
    } else {
      this.util.removeSecureStorage('userID');
    }
  }

  onBtnCreateAccountClicked() {
    this.router.navigateByUrl('/login/signup');
  }
}
