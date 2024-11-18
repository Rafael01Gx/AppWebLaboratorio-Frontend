import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDeAnaliseComponent } from './relatorio-de-analise.component';

describe('RelatorioDeAnaliseComponent', () => {
  let component: RelatorioDeAnaliseComponent;
  let fixture: ComponentFixture<RelatorioDeAnaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioDeAnaliseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioDeAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
