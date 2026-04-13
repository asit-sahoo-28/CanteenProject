

import React, { useState, useContext } from "react";
import "./LoginPop.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../pages/context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPop = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    if (!data.email) {
      toast.error("Email is required");
      return false;
    }

    if (currState === "Sign Up" && !data.name) {
      toast.error("Name is required");
      return false;
    }

    if (
      currState === "Login" ||
      currState === "Sign Up" ||
      currState === "Reset Password"
    ) {
      if (!data.password) {
        toast.error("Password is required");
        return false;
      }
      if (data.password.length < 8) {
        toast.error("Password must be at least 8 characters");
        return false;
      }
    }

    if (currState === "Reset Password") {
      if (!data.confirmPassword) {
        toast.error("Confirm password is required");
        return false;
      }
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
      if (!data.otp) {
        toast.error("OTP is required");
        return false;
      }
    }

    return true;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    let endpoint = "";
    let body = {};

    switch (currState) {
      case "Login":
        endpoint = "/api/v1/auth/login";
        body = { email: data.email, password: data.password };
        break;

      case "Sign Up":
        endpoint = "/api/v1/auth/register";
        body = { name: data.name, email: data.email, password: data.password };
        break;

      case "Forget Password":
        endpoint = "/api/v1/auth/password/forget";
        body = { email: data.email };
        break;

      case "Reset Password":
        endpoint = "/api/v1/auth/password/reset";
        body = {
          email: data.email,
          otp: data.otp,
          password: data.password,
          confirmPassword: data.confirmPassword,
        };
        break;

      default:
        return;
    }

    try {
      const response = await axios.post(url + endpoint, body);

      // ---------- SUCCESS ----------
      if (response.data.success) {
        if (currState === "Sign Up") {
          toast.success(response.data.message || "Signup successful!");
          setCurrState("Login");
        }

        if (currState === "Login" || currState === "Reset Password") {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);

          toast.success(
            response.data.message ||
              (currState === "Login"
                ? "Login successful!"
                : "Password reset successful!")
          );

          setShowLogin(false);
        }

        if (currState === "Forget Password") {
          toast.success(response.data.message || "OTP sent!");
          setCurrState("Reset Password");
        }

        // Reset Form
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          otp: "",
        });
      } else {
        toast.error(response.data.message || "Request failed");
      }
    } catch (error) {
      // ---------- ERROR HANDLING (IMPORTANT PART) ----------
      const message =
        error?.response?.data?.message || // backend message
        (error?.request ? "Server not responding" : null) || // server down
        error?.message || // JS error
        "Wrong password. Try again."; // fallback

      toast.error(message);
    }
  };

  return (
    <div className="loginpop">
      <form className="Login-pop-container" onSubmit={handleSubmit}>
        <div className="login-pop-title">
          <h2>{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-pop-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={data.name}
              onChange={onChangeHandler}
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={data.email}
            onChange={onChangeHandler}
          />

          {(currState === "Login" ||
            currState === "Sign Up" ||
            currState === "Reset Password") && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChangeHandler}
            />
          )}

          {currState === "Reset Password" && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={data.confirmPassword}
                onChange={onChangeHandler}
              />
              <input
                type="number"
                name="otp"
                placeholder="Enter OTP"
                value={data.otp}
                onChange={onChangeHandler}
              />
            </>
          )}
        </div>

        <button type="submit">
          {currState === "Sign Up"
            ? "Create Account"
            : currState === "Forget Password"
            ? "Send OTP"
            : currState === "Reset Password"
            ? "Reset Password"
            : "Login"}
        </button>

        {currState !== "Reset Password" && (
          <div className="login-pop-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the Terms of Use & Privacy Policy</p>
          </div>
        )}

        <div className="login-pop-links">
          {currState === "Login" && (
            <>
              <p>
                Create a new account?
                <span onClick={() => setCurrState("Sign Up")}> Click here</span>
              </p>
              <p>
                Forgot password?
                <span onClick={() => setCurrState("Forget Password")}>
                  Click here
                </span>
              </p>
            </>
          )}

          {currState === "Sign Up" && (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Login")}> Login here</span>
            </p>
          )}

          {currState === "Forget Password" && (
            <p>
              Remember your password?
              <span onClick={() => setCurrState("Login")}> Login here</span>
            </p>
          )}

          {currState === "Reset Password" && (
            <p>
              Go back to login?
              <span onClick={() => setCurrState("Login")}> Login here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPop;
