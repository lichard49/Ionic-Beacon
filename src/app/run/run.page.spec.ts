import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunPage } from './run.page';

describe('RunPage', () => {
  let component: RunPage;
  let fixture: ComponentFixture<RunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
