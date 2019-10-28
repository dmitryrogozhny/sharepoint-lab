export interface IVideoProps {
  /**
   * Text over video
   */
  title: string;
  /**
   * Link to a video
   */
  videoLink: string;
  /**
   * Link to a poster (image to show if video is unavailable)
   */
  posterLink: string;
  /**
   * Link to navigate to
   */
  link: string;
  /**
   * Whether to add a dimming filter over a video
   */
  addFilter: boolean;
  /**
   * Whether to show text over a video
   */
  addTextOver: boolean;
  /**
   * Handler for a Configure button when editing
   */
  onConfigure: () => void;
  /**
   * Whether in editing mode
   */
  isEditing: boolean;
}
