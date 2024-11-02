import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharOrdemDeServicoComponent } from './detalhar-ordem-de-servico.component';

describe('DetalharOrdemDeServicoComponent', () => {
  let component: DetalharOrdemDeServicoComponent;
  let fixture: ComponentFixture<DetalharOrdemDeServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharOrdemDeServicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharOrdemDeServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
