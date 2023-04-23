import React from "react";
import { useRef } from "react";
import axios from "axios";
import classes from "./UpdateProfile.module.css";

const Updateprofile = () => {
  const nameInputRef = useRef();
  const profilePhotoRef = useRef();

  const updateProfileHandler = (e) => {
    e.preventDefault();
    const fullName = nameInputRef.current.value;
    const profilePhoto = profilePhotoRef.current.value;

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCrU_dpYTl7LWLCqRzlvwg6Qb1d6UpAfp0",
        {
          idToken: localStorage.getItem("token"),
          displayName: fullName,
          photoUrl: profilePhoto,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div className={classes.update}>
      <div className={classes.heading}>
        <p>Winners never quit.Quitters never win.</p>
        <p className={classes.message}>
          Your profile is 64% completed.A complete profile has higher chances of
          landing a job.Complete now.
        </p>
      </div>
      <div className={classes.box}>
        <h3>Contact Details</h3>
        <button className={classes.cancelbutton}>Cancel</button>
        <form onSubmit={updateProfileHandler} className={classes.updateform}>
          <label htmlFor="name">Full Name</label>
          <input type="text" ref={nameInputRef} />
          <label htmlFor="profilephoto">Profile Photo URL</label>
          <input type="text" ref={profilePhotoRef} />
          <button className={classes.updatebutton}>Update</button>
        </form>
      </div>
    </div>
  );
};
export default Updateprofile;
