import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletModalComponent } from './delete-modal.component';

describe('DeletModalComponent', () => {
  let component: DeletModalComponent;
  let fixture: ComponentFixture<DeletModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
