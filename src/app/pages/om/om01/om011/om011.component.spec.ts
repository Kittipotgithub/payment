import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Om011Component } from './om011.component';

describe('Om011Component', () => {
  let component: Om011Component;
  let fixture: ComponentFixture<Om011Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Om011Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Om011Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
