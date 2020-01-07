import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Om02Component } from './om02.component';

describe('Om02Component', () => {
  let component: Om02Component;
  let fixture: ComponentFixture<Om02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Om02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Om02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
