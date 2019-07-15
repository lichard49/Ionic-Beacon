import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrInstrPage } from './incr-instr.page';

describe('IncrInstrPage', () => {
  let component: IncrInstrPage;
  let fixture: ComponentFixture<IncrInstrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrInstrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrInstrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
