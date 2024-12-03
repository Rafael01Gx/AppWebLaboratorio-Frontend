import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalAmostrasComponent } from './analytical-amostras.component';

describe('AnalyticalAmostrasComponent', () => {
  let component: AnalyticalAmostrasComponent;
  let fixture: ComponentFixture<AnalyticalAmostrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticalAmostrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticalAmostrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
