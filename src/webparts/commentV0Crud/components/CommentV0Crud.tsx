import * as React from 'react';
import * as jQuery from 'jquery';
import { ICommentV0CrudProps } from './ICommentV0CrudProps'; 

export interface Comment {
  comment: string;
  author: string;
}

export interface CommentV0CrudState {
  newComment: Comment;
}

export default class CommentV0Crud extends React.Component<ICommentV0CrudProps, CommentV0CrudState> {
  constructor(props: ICommentV0CrudProps) {
    super(props);
    this.state = {
      newComment: { comment: '', author: '' }
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({
      newComment: {
        ...this.state.newComment,
        [name]: value
      }
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { comment, author } = this.state.newComment;
    if (!comment || !author) {
      alert('Veuillez saisir le commentaire et l\'auteur.');
      return;
    }
    
    this.addComment(comment, author);
  };

  addComment = (comment: string, author: string) => {
    const requestUrl = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('CommentV0Crud')/items`;
    const itemData = {
      Title: comment,
      comment: comment,
      author: author
    };

    jQuery.ajax({
      url: requestUrl,
      type: "POST",
      contentType: "application/json;odata=verbose",
      data: itemData, 
      headers: {
        "Accept": "application/json;odata=verbose",
        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val() as string 
      },
      success: () => {
        alert('Commentaire ajouté avec succès.');
        // Réinitialiser le formulaire après l'ajout du commentaire
        this.setState({
          newComment: { comment: '', author: '' }
        });
      },
      error: (error) => {
        alert('Erreur lors de l\'ajout du commentaire : ' + JSON.stringify(error));
      }
    });
    
   
  };

  render() {
    return (
      <div>
        <h1>{this.props.description}</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Commentaire:</label>
            <input type="text" name="comment" value={this.state.newComment.comment} onChange={this.handleInputChange} />
          </div>
          <div>
            <label>Auteur:</label>
            <input type="text" name="author" value={this.state.newComment.author} onChange={this.handleInputChange} />
          </div>
          <button type="submit">Ajouter Commentaire</button>
        </form>
      </div>
    );
  }
}
