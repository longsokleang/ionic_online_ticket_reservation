import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedPageModule } from '../shared/shared.module';
import { MnuRoutingPageModule } from './mnu-routing.module';
import { MenuPageModule } from './menu/menu.module';
import { SearchTicketComponent } from './search-ticket/search-ticket.component';
import { OperationComponent } from './operation/operation.component';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationComponent } from './notification/notification.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SettingsComponent } from './settings/settings.component';
import { BmbRewardComponent } from './bmb-reward/bmb-reward.component';
import { MyTripsComponent } from './my-trips/my-trips.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedPageModule,
    MnuRoutingPageModule,
    MenuPageModule,
    TranslateModule
  ],
  declarations: [
    SearchTicketComponent,
    OperationComponent,
    NotificationComponent,
    MyAccountComponent,
    SettingsComponent,
    BmbRewardComponent,
    MyTripsComponent,
  ],
  entryComponents: [
    SearchTicketComponent,
    OperationComponent,
    NotificationComponent,
    MyAccountComponent,
    SettingsComponent,
    MyTripsComponent
  ],
  providers: [

  ]
})

export class MnuPageModule {}
