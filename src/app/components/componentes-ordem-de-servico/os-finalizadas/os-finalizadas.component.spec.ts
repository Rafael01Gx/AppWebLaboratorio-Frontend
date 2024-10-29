import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsFinalizadasComponent } from './os-finalizadas.component';

describe('OsFinalizadasComponent', () => {
  let component: OsFinalizadasComponent;
  let fixture: ComponentFixture<OsFinalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsFinalizadasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsFinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
