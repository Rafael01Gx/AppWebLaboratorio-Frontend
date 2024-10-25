import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoAnaliseListaComponent } from './configuracao-analise-lista.component';

describe('ConfiguracaoAnaliseListaComponent', () => {
  let component: ConfiguracaoAnaliseListaComponent;
  let fixture: ComponentFixture<ConfiguracaoAnaliseListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracaoAnaliseListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoAnaliseListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
