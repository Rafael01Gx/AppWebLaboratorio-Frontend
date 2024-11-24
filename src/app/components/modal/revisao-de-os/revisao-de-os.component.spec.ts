import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisaoDeOsComponent } from './revisao-de-os.component';

describe('RevisaoDeOsComponent', () => {
  let component: RevisaoDeOsComponent;
  let fixture: ComponentFixture<RevisaoDeOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevisaoDeOsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisaoDeOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
