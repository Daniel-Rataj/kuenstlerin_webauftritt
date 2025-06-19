import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionCreateWizardComponent } from './exhibition-create-wizard.component';

describe('ExhibitionCreateWizardComponent', () => {
  let component: ExhibitionCreateWizardComponent;
  let fixture: ComponentFixture<ExhibitionCreateWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionCreateWizardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionCreateWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
