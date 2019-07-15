import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunCompletePage } from './run-complete.page';

describe('RunCompletePage', () => {
  let component: RunCompletePage;
  let fixture: ComponentFixture<RunCompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunCompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunCompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
