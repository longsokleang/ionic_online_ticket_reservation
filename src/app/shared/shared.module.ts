import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './components/footer/footer.component';
import { TicketFiltersComponent } from './components/ticket-filters/ticket-filters.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
      FooterComponent,
      TicketFiltersComponent,
      HeaderComponent
  ],
  entryComponents: [
      FooterComponent,
      TicketFiltersComponent,
      HeaderComponent
  ],
  exports: [
    FooterComponent,
    TicketFiltersComponent,
    HeaderComponent

  ],
  providers: [

  ]
})

export class SharedPageModule {}
