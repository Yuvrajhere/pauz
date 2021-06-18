import "./Post.css";

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
import jwtDecode from "jwt-decode";

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  setAlert,
};

const Post = (props) => {

  const { startLoading, stopLoading, setAlert, postData } = props;

  const history = useHistory();

  const [commentText, setCommentText] = useState("");

  const [recentComments, setRecentComments] = useState([]);

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  useEffect(() => {
    startLoading();
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/comments/post/recent/${postData._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log("Commentsss", res);
        setRecentComments(res.data.data);
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
  }, [startLoading, stopLoading, setAlert, history, postData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startLoading();

    const commentDetails = {
      commentText,
      postId: props.postData._id,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/comments/`, commentDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setCommentText("");
        window.location.reload(false);
        props.stopLoading();
        props.setAlert(res.data.message);
      })
      .catch((error) => {
        props.stopLoading();
        if (error.response) {
          props.setAlert(error.response.data.message);
        } else {
          props.setAlert(error.message + ", Please try again after some time!");
        }
      });
  };

  return (
    <div className="Post container-2">
      <div className="post-header">
        <Link
          to={
            jwtDecode(localStorage.getItem("token")).id ===
            props.postData.postedBy._id
              ? `/profile`
              : `/user/${props.postData.postedBy.username}`
          }
          className="user"
        >
          <img src={props.postData.postedBy.img} alt="profile" />
          <p>{props.postData.postedBy.username}</p>
        </Link>
        <p>{new Date(props.postData.createdAt).toLocaleString()}</p>
      </div>

      <div className="post-content">
        <p>{props.postData.caption}</p>
        {props.postData.imgUrl && <img src={props.postData.imgUrl} alt="post content" />}
      </div>

      <div className="comment-section">
        {props.postData.comments.length > 0 && (
          <>
            <div className="comments">
              {recentComments.map((comment) => {
                return (
                  <Link
                    to={`/user/${comment.commentedBy.username}`}
                    key={comment._id}
                    className="comment"
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

            {props.postData.comments.length > 2 && <Link to={`/comments/${props.postData._id}`}>View all comments</Link>}
          </>
        )}
        <form onSubmit={handleSubmit}>
          <img src={props.userDetails.img} alt="profile" />
          <input
            type="text"
            placeholder="Write a Comment"
            minLength="1"
            maxLength="100"
            value={commentText}
            onChange={handleInputChange}
            required
          />
          <Button className="primary">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Post);
