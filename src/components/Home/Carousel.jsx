import React, { Component } from "react";
import quizzHandler from "../../api/quizzHandler";
import { Link } from "react-router-dom";

export class Carousel extends Component {
  state = {
    quizz: [],
    currentIndex: 1,
  };

  componentDidMount() {
    quizzHandler
      .displayAllQuizz()
      .then((apiRes) => {
        this.setState({ quizz: apiRes.filter(quiz => quiz.supplier === 'OpenQuizzDB - Fournisseur de contenu libre (https://www.openquizzdb.org)') });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  previous = (event) => {
    if (this.state.currentIndex === 1) {
      this.setState({ currentIndex: this.state.quizz.length - 2 });
    } else {
      this.setState({ currentIndex: this.state.currentIndex - 1 });
    }
  };

  next = (event) => {
    if (this.state.currentIndex === this.state.quizz.length - 2) {
      this.setState({ currentIndex: 1 });
    } else {
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
  };

  render() {
    if (!this.state.quizz.length) {
      return <div>No data to display...</div>;
    }
    return (
      <div className="row center">
        <img
          onClick={this.previous}
          className="bouton-flèche"
          alt="previous"
          src="../../../media/icons8-double-gauche-100.png"
        />
        <section className="quizz-home row">
          <Link
            to={`/quizz/${this.state.quizz[this.state.currentIndex - 1]._id}`}
          >
            <div
              className="quizz-sticker row center"
              style={{
                backgroundImage: `url(${
                  this.state.quizz[this.state.currentIndex - 1].image
                })`,
              }}
            >
              <h3 className="row ">
                {this.state.quizz[this.state.currentIndex - 1].title}
              </h3>
            </div>
          </Link>
          <Link to={`/quizz/${this.state.quizz[this.state.currentIndex]._id}`}>
            <div
              className="quizz-sticker row center"
              style={{
                backgroundImage: `url(${
                  this.state.quizz[this.state.currentIndex].image
                })`,
              }}
            >
              <h3 className="row ">
                {this.state.quizz[this.state.currentIndex].title}
              </h3>
            </div>
          </Link>
          <Link
            to={`/quizz/${this.state.quizz[this.state.currentIndex + 1]._id}`}
          >
            <div
              className="quizz-sticker row center"
              style={{
                backgroundImage: `url(${
                  this.state.quizz[this.state.currentIndex + 1].image
                })`,
              }}
            >
              <h3 className="row ">
                {this.state.quizz[this.state.currentIndex + 1].title}
              </h3>
            </div>
          </Link>
        </section>
        <img
          onClick={this.next}
          className="bouton-flèche"
          alt="previous"
          src="../../../media/icons8-double-droite-100.png"
        />
      </div>
    );
  }
}

export default Carousel;
