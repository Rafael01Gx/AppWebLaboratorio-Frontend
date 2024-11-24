import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarResultadoAmostraComponent } from './deletar-resultado-amostra.component';

describe('DeletarResultadoAmostraComponent', () => {
  let component: DeletarResultadoAmostraComponent;
  let fixture: ComponentFixture<DeletarResultadoAmostraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletarResultadoAmostraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarResultadoAmostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
