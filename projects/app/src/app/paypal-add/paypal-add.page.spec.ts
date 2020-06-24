import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaypalAddPage } from './paypal-add.page';

describe('PaypalAddPage', () => {
  let component: PaypalAddPage;
  let fixture: ComponentFixture<PaypalAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaypalAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaypalAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
