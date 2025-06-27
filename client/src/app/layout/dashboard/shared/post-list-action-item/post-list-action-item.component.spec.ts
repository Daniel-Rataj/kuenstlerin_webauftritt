import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListActionItemComponent } from './post-list-action-item.component';

describe('PostListActionItemComponent', () => {
  let component: PostListActionItemComponent;
  let fixture: ComponentFixture<PostListActionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostListActionItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostListActionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
