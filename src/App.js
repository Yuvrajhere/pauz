import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

import Loading from "./components/Loading";
import Alert from "./components/Alert";

import LandingPage from "./components/LandingPage";
import Signup from "./components/Signup";
import Login from "./components/Login";

import Home from "./components/Home";
import Connect from "./components/Connect";
import AddPost from "./components/AddPost";
import UserProfile from "./components/UserProfile";
import Profile from "./components/Profile";
import ConnectionList from "./components/ConnectionList";

import UnknownPage from "./components/UnknownPage";
import Comments from "./components/Comments";

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    alertMessage: state.alertMessage,
  };
};

const App = (props) => {
  return (
    <Router>
      <div className="App">
        {props.isLoading && <Loading />}
        {props.alertMessage && <Alert />}

        <Switch>
          <PublicRoute component={Signup} path="/signup" exact />
          <PublicRoute component={Login} path="/login" exact />
          <PublicRoute component={LandingPage} path="/" exact />

          <PrivateRoute component={Home} path="/home" exact />
          <PrivateRoute component={Connect} path="/connect" exact />
          <PrivateRoute component={AddPost} path="/addpost" exact />
          <PrivateRoute component={Profile} path="/profile/" exact />
          <PrivateRoute component={UserProfile} path="/user/:username" exact />
          <PrivateRoute component={ConnectionList} path="/connections/" exact />
          <PrivateRoute component={Comments} path="/comments/:postId" exact />

          <Route component={UnknownPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(mapStateToProps, null)(App);
