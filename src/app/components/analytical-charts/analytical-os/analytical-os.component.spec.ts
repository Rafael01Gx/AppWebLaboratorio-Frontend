import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticalOsComponent } from './analytical-os.component';

describe('AnalyticalOsComponent', () => {
  let component: AnalyticalOsComponent;
  let fixture: ComponentFixture<AnalyticalOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticalOsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticalOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
