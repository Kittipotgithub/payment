import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Om012Component } from './om012.component';

describe('Om012Component', () => {
  let component: Om012Component;
  let fixture: ComponentFixture<Om012Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Om012Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Om012Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
