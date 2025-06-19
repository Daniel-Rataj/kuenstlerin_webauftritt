import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionElementsUploadComponent } from './exhibition-elements-upload.component';

describe('ExhibitionElementsUploadComponent', () => {
  let component: ExhibitionElementsUploadComponent;
  let fixture: ComponentFixture<ExhibitionElementsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionElementsUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionElementsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
