import React, { Component } from "react";
import { movies } from "../getMovies";
import axios from "axios";
import "./List.css";
import { Link } from "react-router-dom";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: "",
      currPage: 1,
      movies: [],
      parr: [1, 2, 3, 4, 5],
      favMovies: [],
    };
  }

  handleMoviePage = (id) => {
    // console.log("moviePage clicked");
    this.props.setMoviePageId(id);
  };
  handleEnter = (id) => {
    this.setState({
      hover: id,
    });
  };

  handleLeave = () => {
    this.setState({
      hover: "",
    });
  };
  changeMovies = async () => {
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=32470282967f3a345baa030d8e9574bb&language=en-US&page=${this.state.currPage}`
    );
    this.setState({
      movies: [...res.data.results],
    });
    console.log(res);
  };
  handleNext = () => {
    let tempArr = [];
    let ucp = this.state.currPage + 1;
    let start = ucp - 2 >= 1 ? ucp - 2 : 1;
    let end = ucp + 2 >= 5 ? ucp + 2 : 5;
    for (let i = start; i <= end; i++) {
      tempArr.push(i);
    }
    this.setState(
      {
        parr: [...tempArr],
        currPage: this.state.currPage + 1,
      },
      this.changeMovies
    );
  };
  async componentDidMount() {
    console.log("componentDidMount is called");
    let res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=32470282967f3a345baa030d8e9574bb&language=en-US&page=${this.state.currPage}`
    );
    // console.log(res.data);
    let favMovies = JSON.parse(localStorage.getItem("movies")) || [];
    let favMoviesArr = favMovies.map((movieObj) => movieObj.id);
    this.setState({
      movies: [...res.data.results],
      favMovies: [...favMoviesArr],
    });
  }
  // handleNextPage = () => {
  //   this.setState({
  //     currPage: this.state.currPage + 1,
  //   });
  //   this.componentDidMount();
  // };
  handlePrev = () => {
    if (this.state.currPage != 1) {
      console.log("prev called");
      let tempArr = [];
      let ucp = this.state.currPage - 1;
      let start = ucp - 2 >= 1 ? ucp - 2 : 1;
      let end = ucp + 2 >= 5 ? ucp + 2 : 5;
      for (let i = start; i <= end; i++) {
        tempArr.push(i);
      }
      this.setState(
        {
          currPage: this.state.currPage - 1,
          parr: [...tempArr],
        },
        this.changeMovies
      );
    }
  };
  handlePageNum = (pageNum) => {
    this.setState(
      {
        currPage: pageNum,
      },
      this.changeMovies
    );
  };
  handleFavourites = (movieObj) => {
    let localStorageMovies = JSON.parse(localStorage.getItem("movies")) || [];
    if (this.state.favMovies.includes(movieObj.id)) {
      // contains then delete
      localStorageMovies = localStorageMovies.filter(
        (movie) => movie.id != movieObj.id
      );
    } else {
      // not contains then add;
      localStorageMovies.push(movieObj);
    }
    localStorage.setItem("movies", JSON.stringify(localStorageMovies));
    let newFavMovies = localStorageMovies.map((movieObj) => movieObj.id);
    this.setState({
      favMovies: [...newFavMovies],
    });
    console.log(localStorageMovies);
  };
  render() {
    let movie = this.state.movies;
    return (
      <>
        {movie.length == 0 ? (
          <div className="spinner-grow text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div className="list">
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {movie.map((movieObj) => (
                <Link style={{ textDecoration:"none"}} to = {"/MoviePage"} onClick={() => this.handleMoviePage(movieObj.id)}>
                  <div
                    className="card movie-card"
                    onMouseEnter={() => this.handleEnter(movieObj.id)}
                    onMouseLeave={this.handleLeave}
                    // onClick={() => handleMoviePage(movieObj.id)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                      className="card-img-top banner-img"
                      alt="..."
                      style={{ height: "40vh", width: "20vw" }}
                    />
                    {/* <div classNameName="card-body "> */}
                    <h5 className="card-title movie-title">
                      {movieObj.original_title}
                    </h5>
                    {/* <p classNameName="card-text movie-text">
                        {movieObj.overview}
                      </p> */}
                    <div className="button-wrapper">
                      {this.state.hover == movieObj.id &&
                      this.state.favMovies.includes(movieObj.id) ? (
                        <a
                          className="btn btn-danger movie-button"
                          onClick={() => this.handleFavourites(movieObj)}
                        >
                          Remove from Favourites
                        </a>
                      ) : (
                        this.state.hover == movieObj.id && (
                          <a
                            className="btn btn-primary movie-button"
                            onClick={() => this.handleFavourites(movieObj)}
                          >
                            Add to Favourites
                          </a>
                        )
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" key={"prev"}>
                  <a className="page-link" onClick={this.handlePrev}>
                    Previous
                  </a>
                </li>
                {this.state.parr.map((pageNum, index) =>
                  this.state.currPage == pageNum ? (
                    <li className="page-item active" key={index}>
                      <a
                        className="page-link"
                        onClick={() => this.handlePageNum(pageNum)}
                      >
                        {pageNum}
                      </a>
                    </li>
                  ) : (
                    <li className="page-item" key={index}>
                      <a
                        className="page-link"
                        onClick={() => this.handlePageNum(pageNum)}
                      >
                        {pageNum}
                      </a>
                    </li>
                  )
                )}

                <li className="page-item" key={"next"}>
                  <a className="page-link" href="#" onClick={this.handleNext}>
                    Next
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </>
    );
  }
}
