import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionElementsModalComponent } from './exhibition-elements-modal.component';

describe('ExhibitionElementsModalComponent', () => {
  let component: ExhibitionElementsModalComponent;
  let fixture: ComponentFixture<ExhibitionElementsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionElementsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionElementsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
