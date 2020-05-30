import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './components/footer/footer.component';
import { TicketFiltersComponent } from './components/ticket-filters/ticket-filters.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchLocationsComponent } from './components/search-locations/search-locations.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
      FooterComponent,
      TicketFiltersComponent,
      HeaderComponent,
      SearchLocationsComponent
  ],
  entryComponents: [
      FooterComponent,
      TicketFiltersComponent,
      HeaderComponent,
      SearchLocationsComponent
  ],
  exports: [
    FooterComponent,
    TicketFiltersComponent,
    HeaderComponent,
    SearchLocationsComponent

  ],
  providers: [

  ]
})

export class SharedPageModule {}
