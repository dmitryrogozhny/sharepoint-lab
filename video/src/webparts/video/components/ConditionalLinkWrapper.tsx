import * as React from 'react';

export interface ILinkWrapperProps {
  condition: boolean;
  link: string;
  className: string;
}

/**
 * Depending on a condition's truthness renders either an <a> tag with a specified link or <div>
 * @param props
 */
const ConditionalLinkWrapper: React.FunctionComponent<ILinkWrapperProps> = ({ condition, link, className, children }) => {
  return condition ? (<a href={link} className={className}>{children}</a>) : (<div className={className}>{children}</div>);
};

export default ConditionalLinkWrapper;
