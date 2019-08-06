import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreasingTestPage } from './increasing-test.page';

describe('IncreasingTestPage', () => {
  let component: IncreasingTestPage;
  let fixture: ComponentFixture<IncreasingTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreasingTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreasingTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
