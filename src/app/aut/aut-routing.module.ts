import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LanguageComponent } from './language/language.component';
import { GetstartSlideComponent } from './getstart-slide/getstart-slide.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'choose-language', component: LanguageComponent },
  { path: 'getstart', component: GetstartSlideComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AutRoutingPageModule {}
