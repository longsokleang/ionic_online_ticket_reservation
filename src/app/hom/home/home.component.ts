import { Component, OnInit } from '@angular/core';
import { RestAPIService } from 'src/app/shared/services/rest-api.service';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(
    private menuController: MenuController,
  ) {

  }

  ngOnInit() {

  }

  async openMenu() {
    await this.menuController.toggle();
  }

}
