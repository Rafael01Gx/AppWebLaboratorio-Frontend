import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarOsAguardandoAutorizacaoComponent } from './gerenciar-os-aguardando-autorizacao.component';

describe('GerenciarOsAguardandoAutorizacaoComponent', () => {
  let component: GerenciarOsAguardandoAutorizacaoComponent;
  let fixture: ComponentFixture<GerenciarOsAguardandoAutorizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarOsAguardandoAutorizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarOsAguardandoAutorizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
