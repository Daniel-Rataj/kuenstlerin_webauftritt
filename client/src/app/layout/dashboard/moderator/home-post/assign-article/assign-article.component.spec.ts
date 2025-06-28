import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignArticleComponent } from './assign-article.component';

describe('AssignArticleComponent', () => {
  let component: AssignArticleComponent;
  let fixture: ComponentFixture<AssignArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignArticleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
