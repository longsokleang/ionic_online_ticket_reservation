import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs-compat';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { _throw } from 'rxjs/Observable/throw'
import { Storage as Storages } from '@ionic/storage';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

    constructor(
        private storage: Storages,
        public alertCtrl: AlertController
      ) { }
    
    
      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let promise = this.storage.get('my_token');
        console.log('promise: ', promise);
        
    
        return Observable.fromPromise(promise).mergeMap(token => {
          console.log('req: ', req);
          console.log('token2: ', token);
          
            
          let cloneReq = this.addToken(req, token)
          return next.handle(cloneReq).pipe(
            // catchError(e => {
            //   console.log(e)
            //   this.alert(e);
            //   return _throw(e);
            // })
          );
        })
      }

      async alert(e) {
        let msg = e.error;
        let alert = await this.alertCtrl.create({
          // header: e.name,
          message: msg,
          buttons: ['OK']
        });
        alert.present();
      }
    
      private addToken(req: HttpRequest<any>, token: any) {
        console.log('token: ', token);
        
        if (token) {
          let clone: HttpRequest<any>;
          clone = req.clone({
              setHeaders: {
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`,
              }
          });
          return clone;
        }
      }
}