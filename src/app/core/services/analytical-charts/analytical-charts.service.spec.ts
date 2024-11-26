import { TestBed } from '@angular/core/testing';

import { AnalyticalChartsService } from './analytical-charts.service';

describe('AnalyticalChartsService', () => {
  let service: AnalyticalChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyticalChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
