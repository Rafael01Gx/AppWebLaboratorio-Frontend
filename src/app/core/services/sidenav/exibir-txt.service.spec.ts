import { TestBed } from '@angular/core/testing';

import { ExibirTxtService } from './exibir-txt.service';

describe('ExibirTxtService', () => {
  let service: ExibirTxtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExibirTxtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
