import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaliseEmAnamentoComponent } from './analise-em-anamento.component';

describe('AnaliseEmAnamentoComponent', () => {
  let component: AnaliseEmAnamentoComponent;
  let fixture: ComponentFixture<AnaliseEmAnamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnaliseEmAnamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaliseEmAnamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
