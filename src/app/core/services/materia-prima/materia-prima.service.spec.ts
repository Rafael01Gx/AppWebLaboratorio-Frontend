import { TestBed } from '@angular/core/testing';

import { MateriaPrimaService } from './materia-prima.service';

describe('MateriaPrimaService', () => {
  let service: MateriaPrimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaPrimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
