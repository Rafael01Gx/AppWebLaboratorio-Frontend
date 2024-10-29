import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisesFinalizadasComponent } from './analises-finalizadas.component';

describe('AnalisesFinalizadasComponent', () => {
  let component: AnalisesFinalizadasComponent;
  let fixture: ComponentFixture<AnalisesFinalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisesFinalizadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisesFinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
