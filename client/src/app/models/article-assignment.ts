export interface ArticleAssignment {
  id: number;
  pageBlockId: number; // ID of the fixed page block
  articleId: number; // Reference to the assigned article
  showButton: boolean;
  buttonTargetRoute?: string; // Optional button redirect route
}
