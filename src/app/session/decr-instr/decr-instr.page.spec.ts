import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecrInstrPage } from './decr-instr.page';

describe('DecrInstrPage', () => {
  let component: DecrInstrPage;
  let fixture: ComponentFixture<DecrInstrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecrInstrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecrInstrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
