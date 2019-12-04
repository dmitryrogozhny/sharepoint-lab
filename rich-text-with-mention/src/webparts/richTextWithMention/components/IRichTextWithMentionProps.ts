export interface IRichTextWithMentionProps {
  /**
   * Whether web part is currently editing
   */
  isEditing: boolean;
  /**
   * Content in a Quill Delta format
   */
  deltaContent: string;
  /**
   * Content in an Html format
   */
  htmlContent: string;
  /**
   * Event occurs when content content changes
   */
  onChange: (newContent: string, newHtmlContent: string) => void;
  /**
   * Event occurs when people search has been requested
   */
  onSearch: (searchTerm: string) => Promise<Array<{ email: string, name: string }>>;
}
