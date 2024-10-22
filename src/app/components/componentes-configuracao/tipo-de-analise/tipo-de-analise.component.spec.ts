import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeAnaliseComponent } from './tipo-de-analise.component';

describe('TipoDeAnaliseComponent', () => {
  let component: TipoDeAnaliseComponent;
  let fixture: ComponentFixture<TipoDeAnaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDeAnaliseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoDeAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
