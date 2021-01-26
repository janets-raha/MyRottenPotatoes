import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      redirection: false,
    };
  }

  handleChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      comment: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("the submited value is: "+this.state.comment)

    try {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: this.props.userId,
          movie_id: this.props.movieId,
          comment: this.state.comment,
        }),
      };

      const res = await fetch(
        "http://localhost:3000/api/movies/" + this.props.movieId + "/comments/",
        config
      );
      /* if (res.ok) {
        this.setState({ redirection: true })
      } */
    } catch (error) {
      //
    }
  };

  render() {
    const { redirection } = this.state;
    if (redirection) {
      //Affichage de la redirection
      return <Redirect to="#" />;
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label
            xfor="comment"
            className="col-md-4 col-form-label text-md-right"
          >
            Donnez votre avis sur ce film
          </label>
          <div className="col-md-6">
            <textarea
              value={this.state.comment}
              onChange={this.handleChange}
              name="comment"
              type="text"
              className="form-control"
              placeholder="Entrez votre commentaire ici..."
            />
          </div>
          <button type="submit" className="btn btn-primary my-4" onclick={this.props.update}>
            Ça y est, je donne mon avis
          </button>
        </form>
      </div>
    );
  }
}

export default CreateComment;
