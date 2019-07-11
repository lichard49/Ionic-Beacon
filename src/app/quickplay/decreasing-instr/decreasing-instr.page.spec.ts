import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecreasingInstrPage } from './decreasing-instr.page';

describe('DecreasingInstrPage', () => {
  let component: DecreasingInstrPage;
  let fixture: ComponentFixture<DecreasingInstrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecreasingInstrPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecreasingInstrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
