import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmostrasComponent } from './amostras.component';

describe('AmostrasComponent', () => {
  let component: AmostrasComponent;
  let fixture: ComponentFixture<AmostrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmostrasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmostrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
