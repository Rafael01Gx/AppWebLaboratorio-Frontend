import { TestBed } from '@angular/core/testing';

import { ConfiguracaoDeAnaliseService } from './configuracao-de-analise.service';

describe('ConfiguracaoDeAnaliseService', () => {
  let service: ConfiguracaoDeAnaliseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracaoDeAnaliseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
