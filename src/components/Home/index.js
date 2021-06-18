import "./Home.css";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  setAlert,
  startLoading,
  stopLoading,
} from "../../redux/app/appActions";
import { connect } from "react-redux";
import axios from "axios";

import AppNavbar from "../smallerComponents/AppNavbar";
import PostList from "../PostList";

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  setAlert,
};

const Home = (props) => {

  const { startLoading, stopLoading, setAlert } = props;

  const [postsArray, setPostsArray] = useState([]);

  const [userDetails, setUserDetails] = useState("");

  const history = useHistory();

  useEffect(() => {
    startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts/user/feed`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("RES, ", res);

        setUserDetails({
          username: res.data.data.username,
          img: res.data.data.img,
          email: res.data.data.email,
          name: res.data.data.name,
        });

        let tempPostsArray1 = [];
        res.data.data.connections.forEach((connection) => {
          tempPostsArray1.push(connection.posts);
        });

        let tempPostsArray2 = [];
        tempPostsArray1.forEach((userPosts) => {
          // console.log(userPosts);
          tempPostsArray2 = [...tempPostsArray2, ...userPosts];
        });

        setPostsArray(tempPostsArray2);
        stopLoading();
      })
      .catch((err) => {
        // console.log(err);
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
    <div className="Home container-1">
      <AppNavbar />
      <main>
        {postsArray.length > 0 ? (
          <PostList postsArray={postsArray} userDetails={userDetails} />
        ) : (
          <div className="no-posts container-2">
            <p>No recent Posts uploaded by your connections!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Home);
