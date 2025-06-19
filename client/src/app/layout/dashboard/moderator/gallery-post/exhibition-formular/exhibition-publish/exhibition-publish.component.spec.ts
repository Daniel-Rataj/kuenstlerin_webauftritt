import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionPublishComponent } from './exhibition-publish.component';

describe('ExhibitionPublishComponent', () => {
  let component: ExhibitionPublishComponent;
  let fixture: ComponentFixture<ExhibitionPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExhibitionPublishComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExhibitionPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
