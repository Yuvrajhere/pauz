import "./AddPost.css";

import { useState } from "react";
import {
  setAlert,
  startLoading,
  stopLoading,
} from "../../redux/app/appActions";
import { connect } from "react-redux";
import axios from "axios";

import Button from "../smallerComponents/Button";
import AppNavbar from "../smallerComponents/AppNavbar";

const mapDispatchToProps = {
  startLoading,
  stopLoading,
  setAlert,
};

const AddPost = (props) => {
  const [caption, setCaption] = useState("");

  const [img, setImg] = useState("");

  const [url, setUrl] = useState("");

  const handleInputChange = (e) => {
    setCaption(e.target.value);
  };
  
  const savePost = (postDetails) => {
    console.log(postDetails);
    axios
          .post(`${process.env.REACT_APP_API_URL}/posts/`, postDetails, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            // console.log(res);
            setCaption("");
            props.stopLoading();
            props.setAlert(res.data.message);
          })
          .catch((error) => {
            props.stopLoading();
            if (error.response) {
              props.setAlert(error.response.data.message);
            } else {
              props.setAlert(
                error.message + ", Please try again after some time!"
              );
            }
          });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.startLoading();

    if(img) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "pauz-images");
      data.append("cloud_name", "yuvrajhere");
      
      fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "post",
        body: data,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log("cdy", data.url);
        setUrl(`${data.url}`);
        console.log(url);
        const postDetails = {
          caption: caption,
          imgUrl: data.url,
        };
        savePost(postDetails);
      })
      .catch((error) => {
        // console.log(err);
        props.stopLoading();
        if (error.response) {
          props.setAlert(error.response.data.message);
        } else {
          props.setAlert(error.message + ", Please try again after some time!");
        }
      });
    } else {
      const postDetails = {
        caption: caption,
      };
      savePost(postDetails);
    }
  };

  return (
    <div className="AddPost container-1">
      <AppNavbar />
      <main className="container-2">
        <div>
          <h1>Add Post</h1>
          <p>Let your connections know what you are upto.</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="caption">Caption</label>
              <textarea
                id="caption"
                name="caption"
                placeholder="Enter Caption here"
                value={caption}
                onChange={handleInputChange}
                maxLength="150"
              ></textarea>
            </div>
            <div>
              <label htmlFor="img">Image (optional)</label>
              <input
                type="file"
                id="img"
                name="img"
                onChange={(e) => {
                  setImg(e.target.files[0]);
                }}
                accept=".jpg"
              />
            </div>
            <Button className="primary">Upload</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(AddPost);
