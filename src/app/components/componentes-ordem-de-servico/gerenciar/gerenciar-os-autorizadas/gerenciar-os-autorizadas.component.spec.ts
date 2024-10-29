import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarOsAutorizadasComponent } from './gerenciar-os-autorizadas.component';

describe('GerenciarOsAutorizadasComponent', () => {
  let component: GerenciarOsAutorizadasComponent;
  let fixture: ComponentFixture<GerenciarOsAutorizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarOsAutorizadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarOsAutorizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
