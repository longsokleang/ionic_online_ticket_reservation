import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedPageModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AutRoutingPageModule } from './aut-routing.module';
import { LanguageComponent } from './language/language.component';
import { TranslateModule } from '@ngx-translate/core';
import { GetstartSlideComponent } from './getstart-slide/getstart-slide.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageModule,
    AutRoutingPageModule,
    TranslateModule
  ],
  declarations: [
    LoginComponent,
    LanguageComponent,
    GetstartSlideComponent,
    SignupComponent
  ],
  entryComponents: [
    LoginComponent,
    LanguageComponent,
    GetstartSlideComponent,
    SignupComponent
  ],
  exports: [
    LoginComponent
  ],
  providers: [

  ]
})

export class AutPageModule {}
