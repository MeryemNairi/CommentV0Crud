import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import CommentV0Crud from './components/CommentV0Crud';

export interface ICommentV0CrudWebPartProps {
  description: string;
}

export default class CommentV0CrudWebPart extends BaseClientSideWebPart<ICommentV0CrudWebPartProps> {
  public render(): void {
    const element: React.ReactElement<any> = React.createElement(
      CommentV0Crud,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  

}
