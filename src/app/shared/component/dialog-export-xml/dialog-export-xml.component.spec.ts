import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExportXmlComponent } from './dialog-export-xml.component';

describe('DialogExportXmlComponent', () => {
  let component: DialogExportXmlComponent;
  let fixture: ComponentFixture<DialogExportXmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExportXmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExportXmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
