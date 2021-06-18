import "./Profile.css";

import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  setAlert,
  startLoading,
  stopLoading,
} from "../../redux/app/appActions";
import { connect } from "react-redux";
import axios from "axios";

import Button from "../smallerComponents/Button";
import AppNavbar from "../smallerComponents/AppNavbar";
import PostList from "../PostList";

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  setAlert,
};

const Profile = (props) => {
  const { startLoading, stopLoading, setAlert } = props;

  const history = useHistory();

  const [userDetails, setUserDetails] = useState({});

  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/user/self`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("RES, ", res);
        setUserDetails(res.data.data);
        stopLoading();
      })
      .catch((err) => {
        // console.log(err);
        // console.log(err.response);
        if (err.response.status === 401) {
          if (err.response.data.isTokenExpired === true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          setAlert(err.response.data.message);
        } else {
          setAlert("Failed to load data!");
        }
        stopLoading();
      });
  }, [startLoading, stopLoading, setAlert, history]);

  useEffect(() => {
    startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/user/self`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("RES, ", res);
        setPostsArray(res.data.data);
        stopLoading();
      })
      .catch((err) => {
        // console.log(err);
        // console.log(err.response);
        if (err.response && err.response.status === 401) {
          if (err.response.data.isTokenExpired === true) {
            localStorage.removeItem("token");
          }
          history.push("/login");
          setAlert(err.response.data.message);
        } else {
          setAlert("Failed to load data!");
        }
        stopLoading();
      });
  }, [startLoading, stopLoading, setAlert, history]);

  return (
    <div className="Profile container-1">
      <AppNavbar />
      <main className="container-2">
        <div>
          <img src={userDetails.img} alt="profile" />
          <div>
            <h2>{userDetails.username}</h2>
            <p>{userDetails.name}</p>
            <div>
              <p>
                {(userDetails.posts ? userDetails.posts.length : 0) + " posts"}
              </p>
              <p>
                {(userDetails.connections
                  ? userDetails.connections.length
                  : 0) + " connections"}
              </p>
            </div>
            <div className="buttons">
              <Link to="/editprofile">
                <Button className="primary">Edit</Button>
              </Link>
              <Link to="/connections">
                <Button>Connections</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {postsArray.length > 0 ? (
        <PostList postsArray={postsArray} userDetails={userDetails} />
      ) : (
        <div className="no-posts container-2">
          <p>You havent posted anything yet!</p>
          <Link to="/addpost">
            <Button className="primary">New Post</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Profile);
