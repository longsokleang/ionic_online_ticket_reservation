import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BmbRewardComponent } from './bmb-reward.component';

describe('BmbRewardComponent', () => {
  let component: BmbRewardComponent;
  let fixture: ComponentFixture<BmbRewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmbRewardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BmbRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
