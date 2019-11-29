declare module 'favico.js' {
  export interface FavicoOptions {
    /**
     * Badge position (up, down, left, upleft)
     */
    position?: 'down' | 'up' | 'left' | 'upleft';
    /**
     * Badge animation type (slide, fade, pop, popFade, none)
     */
    animation?: 'slide' | 'fade' | 'pop' | 'popFade' | 'none';
    /**
     * Badge shape (circle, rectangle)
     */
    type?: 'circle' | 'rectangle';
    /**
     * Badge background color
     */
    bgColor?: string;
    /**
     * Badge text color
     */
    textColor?: string;
    /**
     * Text font family (Arial, Verdana, Times New Roman, serif, sans-serif,...)
     */
    fontFamily?: string;
    /**
     * Font style (normal, italic, oblique, bold, bolder, lighter, 100, 200, 300, 400, 500, 600, 700, 800, 900)
     */
    fontStyle?: string;
    /**
     * Image element ID if there is need to attach badge to regular image
     */
    elementId?: string;
    /**
     * DOM element where to change "href" attribute (useful in case of multiple link icon elements)
     */
    element?: HTMLElement;
    /**
     * Method that will be called for each animation from with data URI parameter
     */
    dataUrl?: (url: string) => void;
  }

  /**
   * Animate your favicon with animated badges.
   * You can customize type of animation, position, background color and text color.
   */
  class Favico {
    constructor(options: FavicoOptions);

    /**
     * Animate your favicon with animated badges
     * @param value
     */
    public badge(value: number | string);
    /**
     * Regular image to icon
     * @param element
     */
    public image(element: HTMLElement);
    /**
     * HTML5 Video to icon
     * @param element
     */
    public video(element: HTMLElement | 'stop');
    /**
     * Webcam video to icon
     * @param element
     */
    public webcam(element: HTMLElement | 'stop');
  };

  export default Favico;
}
