import { TestBed } from '@angular/core/testing';

import { RunTrackerService } from './run-tracker.service';

describe('RunTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunTrackerService = TestBed.get(RunTrackerService);
    expect(service).toBeTruthy();
  });
});
