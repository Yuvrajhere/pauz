// import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="Navbar container-2">
      <h2>
        <span>P</span>auz
      </h2>
      <ul>
        <li>
          <NavLink activeClassName="navbar-active" to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="navbar-active" to="/signup" exact>
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="navbar-active" to="/login" exact>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
