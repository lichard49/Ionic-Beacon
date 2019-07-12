import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyHistoryPage } from './dummy-history.page';

describe('DummyHistoryPage', () => {
  let component: DummyHistoryPage;
  let fixture: ComponentFixture<DummyHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
