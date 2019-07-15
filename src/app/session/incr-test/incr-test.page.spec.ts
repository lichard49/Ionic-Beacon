import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrTestPage } from './incr-test.page';

describe('IncrTestPage', () => {
  let component: IncrTestPage;
  let fixture: ComponentFixture<IncrTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
