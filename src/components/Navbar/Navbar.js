import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display:'flex' ,justifyContent:"center", background:"lightblue" , padding:"1rem" , alignItems:"center"}} >
        <Link style={{textDecoration: "none"}} to={'/'} ><h1>Movies app</h1></Link>  
        <Link style={{textDecoration: "none"}} to={'/fav'} > 
          <h2 style={{marginLeft:"2rem" ,}}>Favorates</h2> 
        </Link> 
      </div>
    )
  }
}
