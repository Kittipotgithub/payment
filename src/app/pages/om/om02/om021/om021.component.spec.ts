import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Om021Component } from './om021.component';

describe('Om021Component', () => {
  let component: Om021Component;
  let fixture: ComponentFixture<Om021Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Om021Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Om021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
