import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Util } from 'src/app/shared/util';
import { Router } from '@angular/router';
import { DataCenter } from 'src/app/shared/utils/data-center.static';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent implements OnInit {

  util = new Util();
  selectedLanguage: string;
  route = '/login/getstart';

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {
    this.selectedLanguage = 'en';
    const isFromMenu = DataCenter.get('menu', 'isFromMenu');
    if (isFromMenu) {
      this.route = '/menu';
    }
  }

  ngOnInit() {}

  onNextClick() {
    console.log('selectedLanguage: ', this.selectedLanguage);

    this.translateService.setDefaultLang(this.selectedLanguage);
    this.util.setSecureStorage('language', this.selectedLanguage);
    this.router.navigateByUrl(this.route);
  }

}
