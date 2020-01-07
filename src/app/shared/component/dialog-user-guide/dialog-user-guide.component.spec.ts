import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserGuideComponent } from './dialog-user-guide.component';

describe('DialogUserGuideComponent', () => {
  let component: DialogUserGuideComponent;
  let fixture: ComponentFixture<DialogUserGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUserGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
