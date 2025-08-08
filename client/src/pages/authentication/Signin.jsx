//this component is the auth component in the readme. this will allow the user to either register or log in, which will change dynamically depending on state. When successfully logged in, the localStorage token in the browser's client(see readme) will update, redirecting to the /dashboard route. Use conditional rendering set by buttons to swap between the display for the register form and the login form.

import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthorizationContext } from "../../App";

export default function Signin() {
  //state to determine whether to show the register form or the login form
  const [returningUser, setReturningUser] = useState(false);
  const navigate = useNavigate();
  // bring in react context and update context in the if statement so the App globally can read if the user is logged in(has a token)
  const { setToken } = useContext(AuthorizationContext);
  // function to toggle state between true and false for conditional rendering
  const toggleForms = () => {
    setReturningUser(!returningUser);
  };
  // Note to create function for when token to authenticate user is assigned, redirect to dashboard. Is this the correct place to do this?
  if (!returningUser) {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      // prevent default form submission
      e.preventDefault();

      // send API request to register user/
      const res = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }

      // reset form after submission
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    };
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Register</button>
        </form>
        <h2>Already have an account? Click the below button to sign in!</h2>
        <button onClick={toggleForms}>Sign In</button>
      </div>
    );
  }
  if (returningUser) {
    const [form, setForm] = useState({
      email: "",
      password: "",
    });

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      // prevent default form submission
      e.preventDefault();

      // send API request to register user/
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/dashboard");
      } else {
        alert(data.message);
      }

      // reset form after submission
      setForm({
        email: "",
        password: "",
      });
    };
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        <h2>New user? Make an account here!</h2>
        <button onClick={toggleForms}>Sign Up!</button>
      </div>
    );
  }
}
