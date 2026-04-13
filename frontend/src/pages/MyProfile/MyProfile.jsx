
import React, { useContext, useEffect, useState } from "react";
import "./MyProfile.css";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { url, token } = useContext(StoreContext);

  const [user, setUser] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPasswordBox, setShowPasswordBox] = useState(false);

  const [passwordData, setPasswordData] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // ================= FETCH PROFILE =================
  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${url}/api/v1/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  // ================= FETCH REWARDS =================
  const fetchRewards = async () => {
    try {
      const res = await axios.get(`${url}/api/user/my-rewards`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRewards(res.data.rewards || []);
    } catch (err) {
      console.log("Reward fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchRewards();
  }, []);

  // ================= SEND OTP =================
const sendOTP = async () => {
  try {
    if (!user || !user.email) {
      toast.error("Profile not loaded yet");
      return;
    }

    console.log("Sending OTP to:", user.email);

    const res = await axios.post(
      `${url}/api/v1/auth/password/forget`,
      { email: user.email }
    );

    toast.success(res.data.message || "OTP sent successfully");

  } catch (err) {
    console.log("OTP ERROR:", err.response?.data);
    toast.error(err.response?.data?.message || "Failed to send OTP");
  }
};


  // ================= RESET PASSWORD =================
  const changePassword = async () => {
    try {
      if (!user?.email) {
        return toast.error("User email missing");
      }

      if (
        !passwordData.otp ||
        !passwordData.password ||
        !passwordData.confirmPassword
      ) {
        return toast.error("All fields required");
      }

      if (passwordData.password !== passwordData.confirmPassword) {
        return toast.error("Passwords do not match");
      }

      const res = await axios.post(
        `${url}/api/v1/auth/password/reset`,
        {
          email: user.email,
          otp: passwordData.otp,
          password: passwordData.password,
          confirmPassword: passwordData.confirmPassword,
        }
      );

      toast.success(res.data.message || "Password updated successfully");

      setShowPasswordBox(false);

      setPasswordData({
        otp: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      console.log("RESET ERROR:", err.response?.data);
      toast.error(err.response?.data?.message || "Password change failed");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return <div className="profile-loading">Loading your profile...</div>;
  }

  // ================= UI =================
  return (
    <div className="profile-page">
      <div className="profile-wrapper">

        {/* PROFILE CARD */}
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </div>

          <div className="profile-info">
            <div className="info-row">
              <span>Name</span>
              <strong>{user?.name}</strong>
            </div>

            <div className="info-row">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>
          </div>

          <button
            className="change-pass-btn"
            onClick={() => setShowPasswordBox(!showPasswordBox)}
          >
            Change / Forgot Password
          </button>

          {/* PASSWORD BOX */}
          {showPasswordBox && (
            <div className="password-box">

              <input
                type="text"
                placeholder="Enter OTP"
                value={passwordData.otp}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    otp: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="New Password"
                value={passwordData.password}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    password: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <div className="password-actions">
                <button onClick={sendOTP} disabled={!user?.email}>
                  Send OTP
                </button>

                <button onClick={changePassword}>
                  Update Password
                </button>
              </div>

            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default MyProfile;
















