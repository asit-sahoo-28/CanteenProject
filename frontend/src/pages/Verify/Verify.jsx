


import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const Verify = () => {
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const sessionId = new URLSearchParams(
          window.location.search
        ).get("session_id");

        const res = await axios.post(
          url + "/api/order/verify",
          {
            session_id: sessionId,
          }
        );

        if (res.data.success) {
          navigate("/myorders", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } catch (error) {
        navigate("/", { replace: true });
      }
    };

    verify();
  }, [url, navigate]);

  return <h2>Verifying payment...</h2>;
};

export default Verify;





