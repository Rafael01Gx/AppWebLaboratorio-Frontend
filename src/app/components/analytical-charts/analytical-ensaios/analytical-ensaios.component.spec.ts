import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalEnsaiosComponent } from './analytical-ensaios.component';

describe('AnalyticalEnsaiosComponent', () => {
  let component: AnalyticalEnsaiosComponent;
  let fixture: ComponentFixture<AnalyticalEnsaiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticalEnsaiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticalEnsaiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
