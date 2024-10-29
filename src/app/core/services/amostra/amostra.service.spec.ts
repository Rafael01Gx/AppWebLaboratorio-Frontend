import { TestBed } from '@angular/core/testing';

import { AmostraService } from './amostra.service';

describe('AmostraService', () => {
  let service: AmostraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmostraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
