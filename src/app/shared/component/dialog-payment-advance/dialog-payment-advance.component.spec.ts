import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPaymentAdvanceComponent } from './dialog-payment-advance.component';

describe('DialogPaymentAdvanceComponent', () => {
  let component: DialogPaymentAdvanceComponent;
  let fixture: ComponentFixture<DialogPaymentAdvanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPaymentAdvanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPaymentAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
