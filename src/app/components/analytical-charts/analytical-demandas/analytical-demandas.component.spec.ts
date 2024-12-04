import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalDemandasComponent } from './analytical-demandas.component';

describe('AnalyticalDemandasComponent', () => {
  let component: AnalyticalDemandasComponent;
  let fixture: ComponentFixture<AnalyticalDemandasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticalDemandasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticalDemandasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
