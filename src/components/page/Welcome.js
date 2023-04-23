import React from "react";
// import { Button } from "react-bootstrap";
import classes from "./Welcome.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const Welcome = (props) => {
  const navigate = useNavigate(AuthContext);
  const profileUpdateHandler = () => {
    navigate("/updateprofile");
  };
  return (
    <div className={classes.welcome}>
      <h1>Welcome to Expense Tracker</h1>
      <h3>
        Your profile is incomplete.{" "}
        <span onClick={profileUpdateHandler}>Complete Now.</span>
      </h3>
      {/* <Button onClick={verifyEmailHandler} className={classes.verifybutton}>
        Verify your Email
      </Button> */}
    </div>
  );
};
export default Welcome;
