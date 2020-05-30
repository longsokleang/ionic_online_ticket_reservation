import { Util } from './../util';
import { DataCenter } from 'src/app/shared/utils/data-center.static';
import { LOCAL_STORAGE } from '../constants/common.const';

export abstract class Utils {

    public static copyProperties(source: object, target: object): void {
        for (const key of Object.keys(source)) {
            target[key] = source[key];
        }
    }

    public static setProperty(o: object, key: string, value: any): void {
        o[key] = value;
    }

    public static setUserInfoTo(o: object): void {
        const userInfo = this.getUserInfo();
        this.setProperty(o, 'userID', userInfo.userID);
        this.setProperty(o, 'customerNo', userInfo.customerNo);
    }

    public static getUserInfo(): any {
        return DataCenter.get('login', LOCAL_STORAGE.USER_INFO, false);
    }

    public static isVirtaulAccount(accountNumber: string): boolean {
        if (accountNumber === undefined || accountNumber === null) {
          return false;
        }
        if (accountNumber.length === 16) {
          if (accountNumber.substring(3, 4) === '9') {
            return true;
          }
        } else if (accountNumber.length === 13) {
          if (accountNumber.substring(0, 1) === '9') {
              return true;
          }
        } else {
            return false;
        }
    }
    public static removeSpaceFromValue(value: string): string {
        return (value).replace(/\s/g, '');
    }

    public static validateEmail(email: string): boolean {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    public static restrictEmoji(e) {
        if (e.target) {
            const ranges = '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])';
            e.target.value = e.target.value.replace(new RegExp(ranges, 'g'), '');
        }
    }
    public static restricNonEnglishChar(e) {
        if (e.target) {
            e.target.value = e.target.value.replace(/[^A-Za-z0-9\s]+$/g, '');
        }
        return e.target.value;
    }

}
