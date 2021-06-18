import "./Comments.css";

import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  setAlert,
  startLoading,
  stopLoading,
} from "../../redux/app/appActions";
import { connect } from "react-redux";
import axios from "axios";
import jwtDecode from "jwt-decode";

import AppNavbar from "../smallerComponents/AppNavbar";

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  setAlert,
};

const Comments = (props) => {

  const { startLoading, stopLoading, setAlert } = props;

  const { postId } = useParams();

  const [commentsArray, setCommentsArray] = useState([]);

  const history = useHistory();

  useEffect(() => {
    startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/comments/post/${postId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("Commentsss", res);
        setCommentsArray(res.data.data);
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
  }, [startLoading, stopLoading, setAlert, history, postId]);

  return (
    <div className="Comments container-1">
      <AppNavbar />
      <main className="container-2">
        {commentsArray.length > 0 && (
          <div className="comments">
            {commentsArray.map((comment) => {
              return (
                <Link
                  key={comment._id}
                  className="comment"
                  to={
                    jwtDecode(localStorage.getItem("token")).id ===
                    comment.commentedBy._id
                      ? `/profile`
                      : `/user/${comment.commentedBy.username}`
                  }
                >
                  <img src={comment.commentedBy.img} alt="profile" />
                  <div>
                    <p>
                      {comment.commentedBy.username}{" "}
                      <span>
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </p>
                    <p>{comment.commentText}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Comments);
