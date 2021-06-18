import "./Alert.css";

import Button from "../smallerComponents/Button";

import { connect } from "react-redux";
import { removeAlert } from "../../redux/app/appActions";

const mapStateToProps = (state) => {
  return {
    alertMessage: state.alertMessage,
  };
};

const mapDispatchToProps = {
  removeAlert: removeAlert,
};

const Alert = (props) => {
  return (
    <div className="Alert">
      <div className="alert-content">
        <p>{props.alertMessage}</p>
        <Button
          className="primary"
          onClick={() => {
            props.removeAlert();
          }}
        >
          Okay
        </Button>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
