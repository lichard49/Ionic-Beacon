import { TestBed } from '@angular/core/testing';

import { BackpageTrackerService } from './backpage-tracker.service';

describe('BackpageTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackpageTrackerService = TestBed.get(BackpageTrackerService);
    expect(service).toBeTruthy();
  });
});
