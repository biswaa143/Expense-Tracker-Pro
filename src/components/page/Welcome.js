import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Welcome.module.css";
import { Button } from "react-bootstrap";
const Welcome = () => {
  const navigate = useNavigate();

  const profileUpdateHandler = () => {
    navigate("/updateprofile");
  };

  const verifyEmailHandler = () => {
    const token = localStorage.getItem("token");

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        alert("Login your account before veryfying.");

        console.log(err.code);
      });
  };
  return (
    <div className={classes.welcome}>
      <h1>Welcome to Expense Tracker</h1>
      <h3>
        Your profile is incomplete.{" "}
        <span onClick={profileUpdateHandler}>Complete Now.</span>
      </h3>
      <Button onClick={verifyEmailHandler} className={classes.verifybutton}>
        Verify your Email
      </Button>
    </div>
  );
};

export default Welcome;
