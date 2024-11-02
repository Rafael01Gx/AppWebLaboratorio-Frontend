import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheDeAnaliseComponent } from './detalhe-de-analise.component';

describe('DetalheDeAnaliseComponent', () => {
  let component: DetalheDeAnaliseComponent;
  let fixture: ComponentFixture<DetalheDeAnaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheDeAnaliseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheDeAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
