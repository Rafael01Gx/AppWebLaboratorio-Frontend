import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguardandoAutorizacaoComponent } from './aguardando-autorizacao.component';

describe('AguardandoAutorizacaoComponent', () => {
  let component: AguardandoAutorizacaoComponent;
  let fixture: ComponentFixture<AguardandoAutorizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AguardandoAutorizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AguardandoAutorizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
