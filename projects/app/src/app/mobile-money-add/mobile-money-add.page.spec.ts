import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileMoneyAddPage } from './mobile-money-add.page';

describe('MobileMoneyAddPage', () => {
  let component: MobileMoneyAddPage;
  let fixture: ComponentFixture<MobileMoneyAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMoneyAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileMoneyAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
