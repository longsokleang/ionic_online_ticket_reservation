import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Util } from './shared/util';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  util = new Util();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initailizeLanguage();
    });
  }

  ngOnInit() {

  }

  initailizeLanguage() {
    const lang = this.util.getSecureStorage('language');
    if (!lang) {
      this.translateService.setDefaultLang('en');
      this.router.navigateByUrl('/login/choose-language')
    } else {
      this.translateService.setDefaultLang(lang);
      this.router.navigateByUrl('/menu')
    }
  }
}
