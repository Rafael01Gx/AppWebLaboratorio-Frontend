import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeAmostrasComponent } from './lista-de-amostras.component';

describe('ListaDeAmostrasComponent', () => {
  let component: ListaDeAmostrasComponent;
  let fixture: ComponentFixture<ListaDeAmostrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeAmostrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeAmostrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
