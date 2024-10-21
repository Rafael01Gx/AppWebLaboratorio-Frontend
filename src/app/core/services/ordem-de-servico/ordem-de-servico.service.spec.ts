import { TestBed } from '@angular/core/testing';

import { OrdemDeServicoService } from './ordem-de-servico.service';

describe('OrdemDeServicoService', () => {
  let service: OrdemDeServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdemDeServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
