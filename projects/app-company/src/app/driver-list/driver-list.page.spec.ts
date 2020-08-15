import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverListPage } from './driver-list.page';

describe('DriverListPage', () => {
  let component: DriverListPage;
  let fixture: ComponentFixture<DriverListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
