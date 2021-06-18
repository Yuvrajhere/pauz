import "./UserProfile.css";

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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

const UserProfile = (props) => {

  const { startLoading, stopLoading, setAlert } = props;

  const history = useHistory();

  const { username } = useParams();

  const [userDetails, setUserDetails] = useState({});

  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/user/username/${username}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
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
  }, [startLoading, stopLoading, setAlert, history, username]);

  useEffect(() => {
    if (userDetails._id) {
      startLoading();
      axios
        .get(`${process.env.REACT_APP_API_URL}/posts/user/${userDetails._id}`, {
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
    }
  }, [startLoading, stopLoading, setAlert, history, userDetails]);

  const handleRemoveClick = (e) => {
    e.preventDefault();
    startLoading();
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/connection/${userDetails._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAlert("User removed successfully!")
        history.push("/connections");
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
          setAlert("Failed to remove Connection!");
        }
        stopLoading();
      });
  };

  return (
    <div className="UserProfile container-1">
      <AppNavbar />
      <main className="usercard container-2">
        <div>
          <img src={userDetails.img} alt="profile" />
          <div className="user-info">
            <h2>{userDetails.username}</h2>
            <p>{userDetails.name}</p>
            <div>
              <p>
                {(userDetails.posts ? userDetails.posts.length : 0) + " posts"}
              </p>
            </div>
            <div>
              <Button onClick={handleRemoveClick} className="danger">
                Remove
              </Button>
            </div>
          </div>
        </div>
      </main>
      {postsArray.length > 0 ? (
        <PostList postsArray={postsArray} userDetails={userDetails} />
      ) : (
        <div className="no-posts container-2">
          <p>No Posts uploaded by the user yet!</p>
        </div>
      )}
    </div>
  );
};

export default connect(null, mapDispatchToProps)(UserProfile);
