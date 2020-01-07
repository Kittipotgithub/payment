import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Om01Component } from './om01.component';

describe('Om01Component', () => {
  let component: Om01Component;
  let fixture: ComponentFixture<Om01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Om01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Om01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
