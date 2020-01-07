import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReverseComponent } from './dialog-reverse.component';

describe('DialogReverseComponent', () => {
  let component: DialogReverseComponent;
  let fixture: ComponentFixture<DialogReverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReverseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
