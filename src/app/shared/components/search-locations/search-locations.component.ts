import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-search-locations',
  templateUrl: './search-locations.component.html',
  styleUrls: ['./search-locations.component.scss'],
})
export class SearchLocationsComponent implements OnInit {

  constructor(
    private modalService: ModalController
  ) { }

  ngOnInit() {}

  onCancel(e) {
    this.modalService.dismiss();
  }

}
