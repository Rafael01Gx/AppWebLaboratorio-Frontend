import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsPendentesComponent } from './os-pendentes.component';

describe('OsPendentesComponent', () => {
  let component: OsPendentesComponent;
  let fixture: ComponentFixture<OsPendentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsPendentesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsPendentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
