import "./AppNavbar.css";

// import { useState } from "react";
import { NavLink } from "react-router-dom";

import Button from "../Button";

// images
import Logo from "../../../assets/images/logo.png";
import menuIcon from "../../../assets/images/menu-icon.png";
import menuCloseIcon from "../../../assets/images/menu-close-icon.png";
import homeIcon from "../../../assets/images/home-icon.png";
import connectIcon from "../../../assets/images/connect-icon.png";
import addPostIcon from "../../../assets/images/add-post-icon.png";
import profileIcon from "../../../assets/images/profile-icon.png";
// import searchIcon from "../../../assets/images/search-icon.png";

const AppNavbar = (props) => {
  // const [searchInput, setSearchInput] = useState("");

  return (
    <div className="AppNavbar container-2">
      <img src={Logo} alt="Brand Logo" />
      {/* <div className="search-input">
        <input
          type="text"
          placeholder="Search with names"
          name="searchInput"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button>
          <img src={searchIcon} alt="search" />
        </button>
      </div> */}
      <div className="menu">
        <img
          className="menu-close-btn"
          onClick={() => {
            document.getElementsByClassName("menu")[0].style.width = "0";
          }}
          src={menuCloseIcon}
          alt="menu close"
        />

        <ul>
          <li>
            <NavLink to="/home" activeClassName="active" exact>
              <img src={homeIcon} alt="home" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/connect" activeClassName="active" exact>
              <img src={connectIcon} alt="connect" />
              Connect
            </NavLink>
          </li>
          <li>
            <NavLink to="/addpost" activeClassName="active" exact>
              <img src={addPostIcon} alt="add post" />
              Post
            </NavLink>
          </li>
          <li>
            <NavLink to={`/profile/`} activeClassName="active" exact>
              <img src={profileIcon} alt="profile" />
              Profile
            </NavLink>
          </li>
          <Button
            className="danger"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload(false);
            }}
          >
            Logout
          </Button>
        </ul>
      </div>

      <img
        onClick={() => {
          document.getElementsByClassName("menu")[0].style.width = "250px";
        }}
        src={menuIcon}
        className="menu-btn"
        alt="menu"
      />
    </div>
  );
};

export default AppNavbar;
