import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsPageComponent } from './os-page.component';

describe('OsPageComponent', () => {
  let component: OsPageComponent;
  let fixture: ComponentFixture<OsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
