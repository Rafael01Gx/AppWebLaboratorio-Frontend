import { TestBed } from '@angular/core/testing';

import { PrintPdfService } from './print-pdf.service';

describe('PrintPdfService', () => {
  let service: PrintPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
