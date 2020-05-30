import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Util } from 'src/app/shared/util';
import { DataCenter } from 'src/app/shared/utils/data-center.static';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  selectPath: string;

  @Input() activeTitle: string = 'Search Ticket';

  userInfo: any;

  profileAvataAsLetter: String;
  util = new Util();
  profileImg: any;
  isProfileImageInvalid: boolean;

  pages = [];

  pagesBeforeSignIn = [
    { title: 'Search Ticket', url: '/menu/search-ticket' },
    { title: 'Operation', url: '/menu/operation' },
    { title: 'Language', url: '/login/choose-language' },
    { title: 'Sign In', url: '/login' },
  ]

  pagesAfterSignedIn = [
    { title: 'Search Ticket', url: '/menu/search-ticket' },
    { title: 'BMB Reward', url: '/menu/bmb-reward' },
    { title: 'My Trips', url: '/menu/my-trips' },
    { title: 'Operation', url: '/menu/operation' },
    { title: 'Notification', url: '/menu/notification' },
    { title: 'Language', url: '/login/choose-language' },
    { title: 'My Account', url: '/menu/my-account' },
    { title: 'Setting', url: '/menu/settings' }
  ]

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private alert: AlertService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectPath = event.url
    });
    // this.userInfo.profileImgUrl = 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y';
    this.activeTitle = this.util.getSecureStorage('activatedMenu');
    this.renderMenu();
  }

  ngOnInit() {
  }

  renderMenu() {
    console.log('renderMenu');
    this.userInfo = this.util.getSecureStorage('userInfo');
    if (this.userInfo) {
      this.pages = this.pagesAfterSignedIn;
      if (!this.userInfo.profileImgUrl) {
        this.profileAvataAsLetter = this.userInfo.username.substr(0, 1).toUpperCase();
      }
    } else {
      this.pages = this.pagesBeforeSignIn;
    }
  }

  onBtnLogoutClicked() {
    this.alert.confirm(
      'Are you sure to logout?',
      () => {
        console.log('onBtnLogoutClicked');
        this.util.removeSecureStorage('userInfo');
        this.menuCtrl.close();
      });
  }

  onMenuClicked(i) {
    this.activeTitle = i.title;
    // if (i.title == 'Language') {
    //   DataCenter.set('menu', 'isFromMenu', true);
    // } 
    if (i.title == 'Language' || i.title == 'Sign In' || i.title == 'My Account' || i.title == 'Setting' || i.title == 'BMB Reward' || i.title == 'My Trips') {
      DataCenter.set('menu', 'isFromMenu', true);
      this.activeTitle = 'Search Ticket';
    }
    this.menuCtrl.close();
  }
}
