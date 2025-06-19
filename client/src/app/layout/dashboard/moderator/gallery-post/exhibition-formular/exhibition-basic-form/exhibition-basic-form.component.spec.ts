import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionBasicFormComponent } from './exhibition-basic-form.component';

describe('ExhibitionBasicFormComponent', () => {
  let component: ExhibitionBasicFormComponent;
  let fixture: ComponentFixture<ExhibitionBasicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionBasicFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionBasicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
