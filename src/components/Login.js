import React, { useRef, useState } from "react";
// import {useNavigate} from "react-router-dom";
import axios from "axios";
import classes from "./Login.module.css";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(false);
//   const navigate = useNavigate();

  const switchLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0";
    }
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Entered password is incorrect");
    }
    axios
      .post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.idToken;

          localStorage.setItem("token", token);
        //   history.push("/welcome");
          console.log("User has successfully signed up");
          console.log(response);
        }
      })
      .catch((err) => {
        alert("Authentication Failed");
      });
  };

  return (
    <div className={classes.login}>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <h3>{isLogin ? "Login" : "Sign Up"}</h3>
        <input type="email" placeholder="Email Id" ref={emailInputRef} />
        <input type="password" placeholder="password" minLength="6" ref={passwordInputRef} />
        <input type="text" placeholder="Confirm Password" minLength="6" ref={confirmPasswordRef} />
        <button className={classes.forgotpassword}>Forgot Password</button>
        <button className={classes.loginbutton}>{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <div>
        <p>
          {isLogin ? "Dont have an account? " : "Already have an account? "}
          <span onClick={switchLoginHandler}>
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
