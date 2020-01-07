import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExportJsonComponent } from './dialog-export-json.component';

describe('DialogExportJsonComponent', () => {
  let component: DialogExportJsonComponent;
  let fixture: ComponentFixture<DialogExportJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExportJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExportJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
