import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      // { path: 'home', redirectTo: 'home', pathMatch: 'full' }
      // { path: '', redirectTo: 'home' },
      // { path: 'home', loadChildren: './hom/hom.module#HomPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
