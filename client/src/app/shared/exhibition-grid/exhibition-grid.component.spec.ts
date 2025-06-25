import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionGridComponent } from './exhibition-grid.component';

describe('ExhibitionGridComponent', () => {
  let component: ExhibitionGridComponent;
  let fixture: ComponentFixture<ExhibitionGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
