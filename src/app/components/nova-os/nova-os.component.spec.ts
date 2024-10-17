import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaOsComponent } from './nova-os.component';

describe('NovaOsComponent', () => {
  let component: NovaOsComponent;
  let fixture: ComponentFixture<NovaOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaOsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
