import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: String;
  @Input() enabledMenu: boolean;
  @Input() enabledNotification: boolean;
  
  constructor(
    private navCtrl: NavController,
    private router: Router
  ) { }

  ngOnInit() {}

  onBtnBackClicked() {
    // this.navCtrl.back();
    this.router.navigateByUrl('/menu', {replaceUrl: true})
  }
}
