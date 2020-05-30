import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  @Input() tabValue = 'home';

  @Output() tabChangeEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onTabChange(tab: string) {
    console.log(tab);
    if (tab === 'close') {
      this.tabValue = 'home';
    } else {
      this.tabValue = tab;
    }
    this.tabChangeEvent.emit(this.tabValue);
  }

}
