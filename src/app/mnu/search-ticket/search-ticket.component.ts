import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AlertService } from 'src/app/shared/services/alert.service';
import { Util } from 'src/app/shared/util';

@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.scss'],
})
export class SearchTicketComponent implements OnInit {

  @ViewChild(IonSlides, { static: false }) ionSlides: IonSlides;
  
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay:true
  };  

  segment = 0;

  constructor(
    private alert: AlertService
  ) {
  }

  ngOnInit() {}

  ionViewWillEnter() {
    new Util().setSecureStorage('activatedMenu', 'Search Ticket');
  }

  async onSlideChange() {
    const index = await this.ionSlides.getActiveIndex();
    console.log('index: ', index);
    this.segment = index;
  }

  onSegmentChanged() {
    this.ionSlides.slideTo(this.segment);
  }

}
