import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOsComponent } from './manage-os.component';

describe('ManageOsComponent', () => {
  let component: ManageOsComponent;
  let fixture: ComponentFixture<ManageOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageOsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
