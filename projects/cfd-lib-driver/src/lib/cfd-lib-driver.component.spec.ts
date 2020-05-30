import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfdLibDriverComponent } from './cfd-lib-driver.component';

describe('CfdLibDriverComponent', () => {
  let component: CfdLibDriverComponent;
  let fixture: ComponentFixture<CfdLibDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfdLibDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfdLibDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
