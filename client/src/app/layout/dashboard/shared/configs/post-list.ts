import { PostListAddConfig } from './post-list-add-button';

/**
 * Interface to be implemented by components using the PostListComponent.
 * 
 * Defines how items of type T are displayed and interacted with.
 */
export interface PostListHost<T> {
  /**
   * Returns the main title for the list item.
   * Example: item.title
   */
  getTitle(item: T): string;

  /**
   * Returns a secondary line of text, e.g., a formatted date or description.
   */
  getSubtitle(item: T): string;

  /**
   * Returns the text label for the status badge.
   * Example: status string like "Draft" or "Published"
   */
  getBadge(item: T): string;

  /**
   * Returns the CSS class for the badge.
   * Example: "bg-success", "bg-secondary"
   */
  getBadgeClass(item: T): string;

  /**
   * Returns the number of elements associated with the item.
   * Example: item.elements.length
   */
  getElementCount(item: T): number;

  /**
   * Optional: returns configuration for the add button displayed above the list.
   * If not provided, the button will be omitted.
   */
  getAddButton?(): PostListAddConfig;
}
