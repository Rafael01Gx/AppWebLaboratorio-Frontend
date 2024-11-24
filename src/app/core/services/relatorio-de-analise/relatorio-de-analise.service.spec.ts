import { TestBed } from '@angular/core/testing';

import { RelatorioDeAnaliseService } from './relatorio-de-analise.service';

describe('RelatorioDeAnaliseService', () => {
  let service: RelatorioDeAnaliseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioDeAnaliseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
