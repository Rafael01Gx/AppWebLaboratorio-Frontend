import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalharResultadoAmostraComponent } from './detalhar-resultado-amostra.component';

describe('DetalharResultadoAmostraComponent', () => {
  let component: DetalharResultadoAmostraComponent;
  let fixture: ComponentFixture<DetalharResultadoAmostraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalharResultadoAmostraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalharResultadoAmostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
