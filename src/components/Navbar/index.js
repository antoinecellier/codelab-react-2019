import React from "react";
import { Link } from "react-router-dom";
import Logo from './logo.svg'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/">
              <img className="logo" src={Logo} alt="Logo" />
            </Link>
          </div>
        </div>
        <div className="navbar-menu">
          <div className="navbar-end">
            <Link className="navbar-item" to="/recipes/new">
              Ajouter une recette
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
