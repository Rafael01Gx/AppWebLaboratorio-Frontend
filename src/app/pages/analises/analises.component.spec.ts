import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisesComponent } from './analises.component';

describe('AnalisesComponent', () => {
  let component: AnalisesComponent;
  let fixture: ComponentFixture<AnalisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
