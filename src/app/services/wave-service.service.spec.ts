import { TestBed } from '@angular/core/testing';

import { WaveServiceService } from './wave-service.service';

describe('WaveServiceService', () => {
  let service: WaveServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaveServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
