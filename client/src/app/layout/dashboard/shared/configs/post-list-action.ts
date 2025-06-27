export interface PostListAction<T> {
  label: string;
  iconClass: string;
  isDanger?: boolean;
  action: (item: T) => void;
}