import { TestBed } from '@angular/core/testing';
import { ArticleAssignmentService } from './article-assignment.service';


describe('ArticleAssignmentService', () => {
  let service: ArticleAssignmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleAssignmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
