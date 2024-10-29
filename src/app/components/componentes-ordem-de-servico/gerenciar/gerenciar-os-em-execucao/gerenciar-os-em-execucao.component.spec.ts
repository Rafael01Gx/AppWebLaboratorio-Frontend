import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarOsEmExecucaoComponent } from './gerenciar-os-em-execucao.component';

describe('GerenciarOsEmExecucaoComponent', () => {
  let component: GerenciarOsEmExecucaoComponent;
  let fixture: ComponentFixture<GerenciarOsEmExecucaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarOsEmExecucaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarOsEmExecucaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
