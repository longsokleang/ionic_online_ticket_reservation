import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Util } from '../util';
import { LOCAL_STORAGE } from './../../shared/constants/common.const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  util = new Util();
  curUrl: string;
  watchTime: any;

  constructor(
    private router: Router,
    private zone: NgZone,
  ) { 
  }

  public resetTimer(): void {
    let lastEventTime = this.util.getSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME);

    if( lastEventTime ){
      this.watchTime = setInterval(() => {
        if( this.isEventTimeOver(environment.autoLogoutTime) ){
          clearInterval(Number(this.watchTime));

          const userInfo = this.util.getSecureStorage(LOCAL_STORAGE.USER_INFO);

          if( userInfo ){
            // this.modalService.dismissAll();
            // this.modalService.loadingDismiss(); // TODO: still error
            // this.modalService.close();

            this.util.removeSecureStorage(LOCAL_STORAGE.USER_INFO);

            // this.zone.run(() =>  this.router.navigate(['/login/session-timeout'], { replaceUrl: true }));
            // this.signOutService.showSignOutPopup();
            // this.signOutService.showSessionTimeOutPopup();
          }

        }
      }, environment.autoLogoutTime);
    }
 }

  public hasPermission(currentUrl: string): boolean {
    
    let checkResult = false;
    // console.log("Permission check Start " + currentUrl);

    const userMenus = this.util.getSecureStorage("MENU_RIGHT");
    // console.log("this.isTargetPath " + this.isTargetPath(currentUrl));
    if(this.isTargetPath(currentUrl)){
      if (userMenus) {

        userMenus.every( function ( item, index ) {
          if( currentUrl.includes(item["level1MenuDescription"] + "/" +item["level2MenuDescription"]) ){
            // console.log("current url " + currentUrl);
            // console.log("menu url " + item["level1MenuDescription"] + "/" +item["level2MenuDescription"]);
            checkResult = true;
            return false; //for loop break;
          }else{
            // console.log("current url " + currentUrl);
            // console.log("menu url " + item["level1MenuDescription"] + "/" +item["level2MenuDescription"]);
            return true; //for loop continue;
          }
        });

      } else {
        checkResult = false;
      }
    } else {
      checkResult = true;
    }

    return checkResult;

  }

  private isTargetPath(currentUrl: string){

    let checkResult = true;
    const nonPermissionMenu = ["main/home", "announce","/main/setting/detail"];

    // nonPermissionMenu.every(function( item, index ) {
    nonPermissionMenu.every(function( item, index ) {
      if( currentUrl.includes(item) ) {
        checkResult = false;
        return false;
      } else {
        // console.log("current url " + currentUrl);
        // console.log("menu url " + item);
        return true;
      }
    });

    console.log("isTargetPath check finish. " + checkResult);

    return checkResult;

  }

  public hasSession(): boolean {

    if (!this.isEventTimeOver() ){
        if (this.util.getSecureStorage(LOCAL_STORAGE.USER_INFO)){
          return true;
        } else{
          return false;
        }
    } else {
      return false;
    }
  }

   public getUserInfo(): any {
     return this.util.getSecureStorage(LOCAL_STORAGE.USER_INFO);
  }

  public clearStoregeAfterLogout() : void {
    // this.util.removeSecureStorage(AES_INFO.STORE);
    this.util.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
    this.util.removeSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME);
  }

  public setLastEventTime(): void {
    this.util.setSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME, String(new Date().getTime()));
  }

  public initLastEventTime(): void {
    this.util.setSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME, "-1");
  }

  public getLastEventTime(): number {
   
    const lastEventTime = Number(this.util.getSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME));

    return lastEventTime ? lastEventTime : -1;
  }

  public getEventTimeDiff(): number {
    
    const lastEventTime = Number(this.util.getSecureStorage(LOCAL_STORAGE.LAST_EVENT_TIME));

    if (lastEventTime) {
      return new Date().getTime() - lastEventTime;
    } else {
      throw new Error("'lastEventTime' is not defined.");
    }
  }

  public isEventTimeOver(time?: number): boolean {
    const util = new Util();
    const lastEventTime = Number(util.getSecureStorage( LOCAL_STORAGE.LAST_EVENT_TIME ));

    if (lastEventTime) {
      return new Date().getTime() - lastEventTime > (time || environment.autoLogoutTime);
    } else {
      throw new Error("'lastEventTime' is not defined.");
    }
  }


}
