import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoAnaliseComponent } from './configuracao-analise.component';

describe('ConfiguracaoAnaliseComponent', () => {
  let component: ConfiguracaoAnaliseComponent;
  let fixture: ComponentFixture<ConfiguracaoAnaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguracaoAnaliseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracaoAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
