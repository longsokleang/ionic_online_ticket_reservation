import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu/menu.page';
import { SearchTicketComponent } from './search-ticket/search-ticket.component';
import { OperationComponent } from './operation/operation.component';
import { NotificationComponent } from './notification/notification.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { SettingsComponent } from './settings/settings.component';
import { BmbRewardComponent } from './bmb-reward/bmb-reward.component';
import { MyTripsComponent } from './my-trips/my-trips.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      { path: '', redirectTo: 'search-ticket', pathMatch: 'full' },
      // { path: 'home', loadChildren: './hom/hom.module#HomPageModule' },
      { path: 'search-ticket', component: SearchTicketComponent },
      { path: 'operation', component: OperationComponent },
      { path: 'notification', component: NotificationComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'bmb-reward', component: BmbRewardComponent },
      { path: 'my-trips', component: MyTripsComponent },

    ]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class MnuRoutingPageModule {}
