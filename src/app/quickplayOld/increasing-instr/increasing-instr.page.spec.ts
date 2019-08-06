import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncreasingInstrPage } from './increasing-instr.page';

describe('IncreasingInstrPage', () => {
  let component: IncreasingInstrPage;
  let fixture: ComponentFixture<IncreasingInstrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncreasingInstrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncreasingInstrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
