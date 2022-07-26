import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar__links">
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <p>Movies</p>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/fav"}>
            <p >TV shows</p>
          </Link>
          <Link style={{ textDecoration: "none" }} to={"/fav"}>
            <p >Favorates</p>
          </Link>
          
        </div>
        <div className="navbar__search">
          <div class="input-group rounded">
            <input
              type="search"
              class="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <span class="input-group-text border-0" id="search-addon">
            <i class="fa-solid fa-magnifying-glass"></i>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
