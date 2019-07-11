import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreasingTestPage } from './decreasing-test.page';

describe('DecreasingTestPage', () => {
  let component: DecreasingTestPage;
  let fixture: ComponentFixture<DecreasingTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecreasingTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecreasingTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
