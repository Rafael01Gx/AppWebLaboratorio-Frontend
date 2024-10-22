import { TestBed } from '@angular/core/testing';

import { TipoDeAnaliseService } from './tipo-de-analise.service';

describe('TipoDeAnaliseService', () => {
  let service: TipoDeAnaliseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoDeAnaliseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
