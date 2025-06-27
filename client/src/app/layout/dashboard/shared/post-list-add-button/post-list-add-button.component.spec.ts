import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListAddButtonComponent } from './post-list-add-button.component';

describe('PostListAddButtonComponent', () => {
  let component: PostListAddButtonComponent;
  let fixture: ComponentFixture<PostListAddButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListAddButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListAddButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
