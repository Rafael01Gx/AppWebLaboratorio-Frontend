import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAnalisesPreditivasComponent } from './painel-analises-preditivas.component';

describe('PainelAnalisesPreditivasComponent', () => {
  let component: PainelAnalisesPreditivasComponent;
  let fixture: ComponentFixture<PainelAnalisesPreditivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelAnalisesPreditivasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelAnalisesPreditivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
