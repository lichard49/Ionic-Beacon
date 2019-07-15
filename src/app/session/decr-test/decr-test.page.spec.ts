import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecrTestPage } from './decr-test.page';

describe('DecrTestPage', () => {
  let component: DecrTestPage;
  let fixture: ComponentFixture<DecrTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecrTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecrTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
