import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoDeResultadosComponent } from './lancamento-de-resultados.component';

describe('LancamentoDeResultadosComponent', () => {
  let component: LancamentoDeResultadosComponent;
  let fixture: ComponentFixture<LancamentoDeResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoDeResultadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoDeResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
