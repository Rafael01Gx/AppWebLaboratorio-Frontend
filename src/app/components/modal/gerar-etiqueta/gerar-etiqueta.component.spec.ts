import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerarEtiquetaComponent } from './gerar-etiqueta.component';

describe('GerarEtiquetaComponent', () => {
  let component: GerarEtiquetaComponent;
  let fixture: ComponentFixture<GerarEtiquetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerarEtiquetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerarEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
