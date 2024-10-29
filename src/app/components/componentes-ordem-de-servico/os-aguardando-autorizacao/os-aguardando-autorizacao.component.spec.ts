import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsAguardandoAutorizacaoComponent } from './os-aguardando-autorizacao.component';

describe('OsAguardandoAutorizacaoComponent', () => {
  let component: OsAguardandoAutorizacaoComponent;
  let fixture: ComponentFixture<OsAguardandoAutorizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsAguardandoAutorizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsAguardandoAutorizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
