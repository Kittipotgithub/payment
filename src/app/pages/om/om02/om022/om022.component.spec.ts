import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Om022Component } from './om022.component';

describe('Om022Component', () => {
  let component: Om022Component;
  let fixture: ComponentFixture<Om022Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Om022Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Om022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
