import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigAnaliseComponent } from './edit-config-analise.component';

describe('EditConfigAnaliseComponent', () => {
  let component: EditConfigAnaliseComponent;
  let fixture: ComponentFixture<EditConfigAnaliseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditConfigAnaliseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditConfigAnaliseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
