import "./ConnectionList.css";

import { useState, useEffect } from "react";
import {
  setAlert,
  startLoading,
  stopLoading,
} from "../../redux/app/appActions";
import { connect } from "react-redux";
import axios from "axios";

import AppNavbar from "../smallerComponents/AppNavbar";
import { Link, useHistory } from "react-router-dom";

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  setAlert,
  startLoading,
  stopLoading,
};

const ConnectionList = (props) => {

  const { startLoading, stopLoading, setAlert } = props;

  const history = useHistory();

  const [connectionsArray, setConnectionsArray] = useState([]);

  useEffect(() => {
    startLoading();
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/user/getConnections/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        // console.log("RES, ", res);
        setConnectionsArray(res.data.data);
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

  return (
    <div className="ConnectionList container-1">
      <AppNavbar />
      <main className="container-2">
        <h1>Your connections</h1>
        <div className="connections">
          {connectionsArray.map((connection) => {
            return (
              <Link to={`/user/${connection.username}`} key={connection._id} className="connection">
                <img src={connection.img} alt="profile" />
                <div>
                  <p>{connection.name}</p>
                  <p>{connection.username}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionList);
