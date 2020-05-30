import { NgModule } from '@angular/core';
import { HomRoutingPageModule } from './hom-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedPageModule } from '../shared/shared.module';
import { InfoComponent } from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomRoutingPageModule,
    SharedPageModule

  ],
  declarations: [
      HomeComponent,
      InfoComponent
  ],
  entryComponents: [
      HomeComponent,
      InfoComponent
  ],
  providers: [

  ]
})

export class HomPageModule {}
