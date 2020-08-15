import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverEditPage } from './driver-edit.page';

describe('DriverEditPage', () => {
  let component: DriverEditPage;
  let fixture: ComponentFixture<DriverEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
