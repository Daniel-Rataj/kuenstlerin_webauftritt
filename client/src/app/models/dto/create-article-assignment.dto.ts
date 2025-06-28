export interface CreateArticleAssignmentDto {
    id?: number;
    pageBlockId: number;
    articleId: number;
    showButton: boolean;
    buttonTargetRoute?: string;
}