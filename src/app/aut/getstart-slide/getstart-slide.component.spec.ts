import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetstartSlideComponent } from './getstart-slide.component';

describe('GetstartSlideComponent', () => {
  let component: GetstartSlideComponent;
  let fixture: ComponentFixture<GetstartSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetstartSlideComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetstartSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
