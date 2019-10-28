import * as React from 'react';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { escape } from '@microsoft/sp-lodash-subset';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import styles from './Video.module.scss';
import { IVideoProps as IVideoProps } from './IVideoProps';
import ConditionalLinkWrapper from './ConditionalLinkWrapper';

/**
 * Renders a video with an optional link and text.
 * While editing, if a link to video is not specified - show edit placeholder, otherwise show video with link disabled.
 * While displaying, if a link to video is not specified - show empty placeholder, otherwise show video.
 * @param props
 */
const Video: React.FunctionComponent<IVideoProps> = ({ videoLink, posterLink, link, addTextOver, title, addFilter, isEditing, onConfigure }) => {

  /**
   * Returns a content for a component to render.
   * Content depends on whether currently editing or not, and whether a link to a video has been specified.
   */
  function renderVideo() {
    // video player with an optional link and filter over the video
    const videoContainer = (<ConditionalLinkWrapper condition={link && !isEditing} link={link} className={styles.videoContainer}>
      <div className={css(styles.dimmingFilter, addFilter ? '' : styles.hidden)}></div>
      <video autoPlay loop muted playsinline src={videoLink} poster={posterLink}></video>
      <div className={css(styles.textContainer, addTextOver ? '' : styles.hidden)}>
        <div className={styles.overlayTextContainer}>
          <div className={styles.overlayText}>
            {escape(title)}
          </div>
        </div>
      </div>
    </ConditionalLinkWrapper>);

    if (isEditing) {
      if (videoLink) {
        // if editing and link to a video is specified - show video player without <a> link
        return videoContainer;
      } else {
        // if editing and link to a video is not specified - show edit placeholder
        return (
          <Placeholder
            iconName='MSNVideos'
            iconText='Video'
            description='Display a video with an optional link and text.'
            buttonLabel='Add video'
            onConfigure={onConfigure}
          />
        );
      }
    } else {
      if (videoLink) {
        // if displaying and link to a video is specified - show video player (with or without <a> link)
        return videoContainer;
      } else {
        // if displaying and link to a video is not specified - show empty placeholder
        return (<div></div>);
      }
    }
  }

  return (
    <div className={styles.video}>
      {renderVideo()}
    </div>
  );
};

export default Video;
