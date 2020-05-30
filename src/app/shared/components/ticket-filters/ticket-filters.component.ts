import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchLocationsComponent } from '../search-locations/search-locations.component';

@Component({
  selector: 'app-ticket-filters',
  templateUrl: './ticket-filters.component.html',
  styleUrls: ['./ticket-filters.component.scss'],
})
export class TicketFiltersComponent implements OnInit {

  constructor(
    private modalService: ModalController
  ) {
  }

  ngOnInit() {}

  async onBtnFromClicked() {
    const modal = await this.modalService.create({
      component: SearchLocationsComponent,
      // cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
  async onBtnToClicked() {
    const modal = await this.modalService.create({
      component: SearchLocationsComponent,
      // cssClass: 'my-custom-class'
    });
    return await modal.present();
  }



}
