//this component is the auth component in the readme. this will allow the user to either register or log in, which will change dynamically depending on state. When successfully logged in, the localStorage token in the browser's client(see readme) will update, redirecting to the /dashboard route. Use conditional rendering set by buttons to swap between the display for the register form and the login form.

import React from "react";
import { useState } from "react";

export default function Signin() {
  //state to determine whether to show the register form or the login form
  const [returningUser, setReturningUser] = useState(false);
  // function to toggle state between true and false for conditional rendering
  const toggleForms = () => {
    setReturningUser(!returningUser);
  };
  // Note to create function for when token to authenticate user is assigned, redirect to dashboard. Is this the correct place to do this?
  if (!returningUser) {
    return <div>Register</div>; /*register form*/
    //button for "already have an account? Sign in here!" onClick event toggleForms
  }
  if (returningUser) {
    return <div>Login</div>; /*login form*/
    //button for "new user? Register here!" onClick event toggleForms
  }
}
