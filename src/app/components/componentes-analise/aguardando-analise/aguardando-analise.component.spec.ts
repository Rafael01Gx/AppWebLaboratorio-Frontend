import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AguardandoAnaliseComponent } from './aguardando-analise.component';

describe('AguardandoAnaliseComponent', () => {
  let component: AguardandoAnaliseComponent;
  let fixture: ComponentFixture<AguardandoAnaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AguardandoAnaliseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AguardandoAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
