import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalEmAtrasoComponent } from './analytical-em-atraso.component';

describe('AnalyticalEmAtrasoComponent', () => {
  let component: AnalyticalEmAtrasoComponent;
  let fixture: ComponentFixture<AnalyticalEmAtrasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticalEmAtrasoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticalEmAtrasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
