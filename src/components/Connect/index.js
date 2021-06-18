import "./Connect.css";

import { useState } from "react";
import {
  setAlert,
  startLoading,
  stopLoading,
} from "../../redux/app/appActions";
import { connect } from "react-redux";
import axios from "axios";

import AppNavbar from "../smallerComponents/AppNavbar";
import Input from "../smallerComponents/Input";
import Button from "../smallerComponents/Button";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setAlert,
  startLoading,
  stopLoading,
};

const Connect = (props) => {
  const [inputCode, setInputCode] = useState("");

  const [currentUserCode, setCurrentUserCode] = useState("");

  const [generatedCode, setGeneratedCode] = useState("");

  const [foundUser, setFoundUser] = useState("");

  const handleInputChange = (e) => {
    setInputCode(e.target.value);
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    props.startLoading();

    axios
      .get(`${process.env.REACT_APP_API_URL}/connectionRequests/code/${inputCode}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setFoundUser(res.data.data);
        setCurrentUserCode(inputCode);
        props.stopLoading();
      })
      .catch((error) => {
        props.stopLoading();
        // console.log(error.message)
        // if (error.response) {
        //   props.setAlert(error.response.data.message);
        // } else {
        //   props.setAlert(error.message + ", Please try again after some time!");
        // }
        props.setAlert("Unable to find user with this code!");
      });
  };

  const generateCode = () => {
    props.startLoading();

    axios
      .get(`${process.env.REACT_APP_API_URL}/connectionRequests/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setGeneratedCode(res.data.data.code);
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

  const handleConnectSubmit = (e) => {
    e.preventDefault();
    props.startLoading();

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/connectionRequests/addConnection/`,
        {
          user1Id: foundUser._id,
          code: currentUserCode
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        // console.log(res);
        setFoundUser("");
        setCurrentUserCode("");
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
    <div className="Connect container-1">
      <AppNavbar />
      <main className="container-2">
        <div>
          <h1>Connect</h1>
          <form className="have-code" onSubmit={handleCodeSubmit}>
            <h2>Have a connection code?</h2>
            <p>Enter the code given to you by your friend.</p>
            <Input
              type="text"
              onChange={handleInputChange}
              value={inputCode}
              placeholder="Enter code here"
              label="Code"
              required
            />
            <Button className="primary">Check</Button>
          </form>

          {foundUser && (
            <form className="found-user" onSubmit={handleConnectSubmit}>
              <div>
                <img src={foundUser.img} alt="user" />
                <div>
                  <p>{foundUser.username}</p>
                  <p>{foundUser.name}</p>
                </div>
              </div>
              <Button className="primary">Connect</Button>
            </form>
          )}

          <div className="gen-code">
            <h2>Want to invite someone to your connection list? </h2>
            <p>
              You can share this code with your friend to let them send you a
              connection request.
            </p>
            <Button onClick={generateCode} className="primary">
              Generate
            </Button>
            {generatedCode && (
              <Input
                type="text"
                value={generatedCode}
                label="Generated Code"
                readOnly={true}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
