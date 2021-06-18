import "./Login.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  setAlert,
  startLoading,
  stopLoading,
} from "../../redux/app/appActions";
import { connect } from "react-redux";
import axios from "axios";

import Navbar from "../smallerComponents/Navbar";
import Button from "../smallerComponents/Button";
import Input from "../smallerComponents/Input";

import LoginImage1 from "../../assets/images/login-img-1.png";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps =  {
    startLoading,
    stopLoading,
    setAlert,
};

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startLoading();
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, loginDetails)
      .then(
        (response) => {
          localStorage.setItem("token", response.data.token);
          props.stopLoading();
          window.location.reload(false);
        },
        (error) => {
          props.stopLoading();
          if (error.response) {
            props.setAlert(error.response.data.message);
          } else {
            props.setAlert(error.message);
          }
        }
      );
  };

  return (
    <div className="Login container-1">
      <Navbar />
      <main className="container-2">
        <div>
          <h1>Login</h1>
          <p>
            See what your friends are doing by<br/> loging in with your{" "}
            <span>email and password</span>.
          </p>

          <img src={LoginImage1} alt="Friends in windows" />
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Email"
              name="email"
              value={loginDetails.email}
              onChange={handleInputChange}
              automComplete="off"
              minLength="5"
              maxLength="30"
              placeholder="Enter your email here"
              required
            />

            <Input
              type="password"
              label="Password"
              name="password"
              value={loginDetails.password}
              onChange={handleInputChange}
              automComplete="off"
              minLength="6"
              maxLength="10"
              placeholder="Enter your password here"
              required
            />
            <Button className="primary">Login</Button>
          </form>
          <div>
            <p>
              Dont have an account?
              <span>
                <Link to="/signup"> Signup here.</Link>
              </span>
            </p>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
