import * as React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'quill-mention';

import styles from './RichTextWithMention.module.scss';
import { IRichTextWithMentionProps } from './IRichTextWithMentionProps';

/**
 * Interface used by Quill mention
 */
interface MentionItem {
  id: string;
  value: string;
}

const Embed = Quill.import('blots/embed');
/**
 * Custom QUill Blot for rendering mentions as Microsoft Graph toolkit component mgt-person
 */
class GraphMentionBlot extends Embed {
  public static blotName = 'mention';
  public static tagName = 'span';
  public static className = styles.mention;

  public static create(data: MentionItem) {
    const node = super.create();

    node.innerHTML += `<mgt-person show-name="true" class="${styles.personSmall}" person-card="hover" person-query="${data.id}"></mgt-person>`;
    return GraphMentionBlot.setDataValues(node, data);
  }

  public static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach((key) => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  public static value(domNode) {
    return domNode.dataset;
  }
}

export default class RichTextWithMention extends React.Component<IRichTextWithMentionProps, {}> {
  /**
   * Initialize mention module
   */
  private mentionModule = {
    allowedChars: /^[A-Za-z\s]*$/,
    mentionDenotationChars: ["@"],
    listItemClass: styles.mentionsContainer,
    minChars: 2,
    onSelect: (item, insertItem) => {
      insertItem(item);
    },
    source: async (searchTerm, renderList, mentionChar) => {
      if (searchTerm.length === 0) {
        renderList([], searchTerm);
      } else {
        const users = await this.props.onSearch(searchTerm);
        const matches = users.map((user) => ({id: user.email, value: user.name}));
        renderList(matches, searchTerm);
      }
    },
    renderItem: (item, searchTerm) => {
      return `<mgt-person show-name="true" class="${styles.personLarge}" person-query="${item.id}"></mgt-person>`;
    }
  };

  /**
   * Get new content from Quill as Delta and as Html and execute the callback function
   */
  private handleChange = (content, delta, source, editor) => {
    const deltaContent = editor.getContents();
    const htmlContent = editor.getHTML();

    this.props.onChange(deltaContent, htmlContent);
  }

  /**
   * Render unsafe html for div
   */
  public getEditorContent = () => {
    return {
      __html: this.props.htmlContent,
    };
  }

  public render(): React.ReactElement<IRichTextWithMentionProps> {
    // register Segue UI as supported font
    const font = Quill.import('formats/font');
    font.whitelist = ['Segoe UI'];
    Quill.register(font, true);
    // register custom blot for mentions
    Quill.register(GraphMentionBlot, true);

    // if there is no content, initialize empty Delta as initial content
    const Delta = Quill.import('delta');
    const content = this.props.deltaContent ? this.props.deltaContent : new Delta();

    return (
      <div className={styles.richTextWithMention} >
        {this.props.isEditing ? (
          <ReactQuill
            value={content}
            onChange={this.handleChange}
            modules={
              {
                mention: this.mentionModule,
              }
            }
          />
        ) : (
            <div dangerouslySetInnerHTML={this.getEditorContent()}>
            </div>
          )}
      </div>
    );
  }
}
