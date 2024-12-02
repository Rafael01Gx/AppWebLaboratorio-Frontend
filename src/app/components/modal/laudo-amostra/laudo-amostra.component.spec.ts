import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaudoAmostraComponent } from './laudo-amostra.component';

describe('LaudoAmostraComponent', () => {
  let component: LaudoAmostraComponent;
  let fixture: ComponentFixture<LaudoAmostraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaudoAmostraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaudoAmostraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
