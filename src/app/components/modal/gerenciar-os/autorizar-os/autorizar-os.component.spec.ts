import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizarOsComponent } from './autorizar-os.component';

describe('AutorizarOsComponent', () => {
  let component: AutorizarOsComponent;
  let fixture: ComponentFixture<AutorizarOsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutorizarOsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizarOsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
