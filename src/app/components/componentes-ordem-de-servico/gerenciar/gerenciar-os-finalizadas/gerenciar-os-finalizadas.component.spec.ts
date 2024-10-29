import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarOsFinalizadasComponent } from './gerenciar-os-finalizadas.component';

describe('GerenciarOsFinalizadasComponent', () => {
  let component: GerenciarOsFinalizadasComponent;
  let fixture: ComponentFixture<GerenciarOsFinalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarOsFinalizadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GerenciarOsFinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
