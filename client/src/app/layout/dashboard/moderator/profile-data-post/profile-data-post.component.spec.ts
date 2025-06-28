import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDataPostComponent } from './profile-data-post.component';

describe('ProfileDataPostComponent', () => {
  let component: ProfileDataPostComponent;
  let fixture: ComponentFixture<ProfileDataPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDataPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileDataPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
