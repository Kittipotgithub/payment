import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSaveOmComponent } from './dialog-save-om.component';

describe('DialogSaveOmComponent', () => {
  let component: DialogSaveOmComponent;
  let fixture: ComponentFixture<DialogSaveOmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSaveOmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSaveOmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
