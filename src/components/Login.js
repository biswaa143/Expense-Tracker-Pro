import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import AuthContext from "./store/auth-context";
// import {AiOutlineEyeInvisible} from "react-icons/ai";

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const switchLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
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
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // show an error modal
            let errorMessage =
              "Authentication failed: Please check your Email or Password!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        console.log('hi');
        navigate('/Welcome');
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <div className={classes.login}>
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <h3>{isLogin ? "Login" : "Sign Up"}</h3>
        <input type="email" placeholder="Email Id" ref={emailInputRef} />
        <input
          type="password"
          placeholder="password"
          minLength="6"
          ref={passwordInputRef}
        />
        <input
          type="text"
          placeholder="Confirm Password"
          minLength="6"
          ref={confirmPasswordRef}
        />
        <button className={classes.forgotpassword}>Forgot Password</button>
        <button className={classes.loginbutton}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
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
