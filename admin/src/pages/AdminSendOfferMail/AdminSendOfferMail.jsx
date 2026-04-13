// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./AdminSendOfferMail.css"
// const AdminSendOfferMail = ({ url, token }) => {
//   const [form, setForm] = useState({
//     subject: "",
//     title: "",
//     messageBody: "",
//     couponCode: "",
//     expiryDate: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const sendMail = async () => {
//     try {
//       const res = await axios.post(
//         `${url}/api/offer-mail/send`,
//         form,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) toast.success(res.data.message);
//       else toast.error(res.data.message);
//     } catch (err) {
//       toast.error("Failed to send offer mail");
//     }
//   };

//   return (
//     <div className="offer-mail-panel">
//       <h2>Send Offer Mail</h2>

//       <input name="subject" placeholder="Mail Subject" onChange={handleChange} />
//       <input name="title" placeholder="Offer Title" onChange={handleChange} />

//       <textarea
//         name="messageBody"
//         placeholder="Write Offer Message..."
//         onChange={handleChange}
//       />

//       <input name="couponCode" placeholder="Coupon Code (Optional)" onChange={handleChange} />
//       <input name="expiryDate" placeholder="Expiry Date (Optional)" onChange={handleChange} />

//       <button onClick={sendMail}>Send Offer Mail</button>
//     </div>
//   );
// };

// export default AdminSendOfferMail;










import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AdminSendOfferMail.css";

const AdminSendOfferMail = ({ url, token }) => {
  const [loading, setLoading] = useState(false); // 🔥 loading state

  const [form, setForm] = useState({
    subject: "",
    title: "",
    messageBody: "",
    couponCode: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ AI GENERATE MESSAGE WITH LOADING
const generateOfferAI = async () => {
  if (!form.subject || !form.title) {
    toast.error("Enter subject & title first");
    return;
  }

  try {
    setLoading(true); // 🔥 start loading

    const res = await axios.post(`${url}/api/offer-mail/ai-message`, {
      subject: form.subject,
      title: form.title,
    });

    // 🔥 FORCE DELAY (1.5 sec)
    setTimeout(() => {
      if (res.data.success) {
        setForm((prev) => ({
          ...prev,
          messageBody: res.data.data,
        }));
        toast.success("AI Message Generated");
      } else {
        toast.error(res.data.message);
      }

      setLoading(false); // 🔥 stop after delay
    }, 1500);

  } catch (err) {
    toast.error("AI failed");
    setLoading(false);
  }
};

  // ✅ SEND MAIL
  const sendMail = async () => {
    try {
      const res = await axios.post(
        `${url}/api/offer-mail/send`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) toast.success(res.data.message);
      else toast.error(res.data.message);
    } catch (err) {
      toast.error("Failed to send offer mail");
    }
  };

  return (
    <div className="offer-mail-panel">
      <h2>Send Offer Mail</h2>

      <input
        name="subject"
        placeholder="Mail Subject"
        value={form.subject}
        onChange={handleChange}
      />

      <input
        name="title"
        placeholder="Offer Title"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="messageBody"
        placeholder="Write Offer Message..."
        value={form.messageBody}
        onChange={handleChange}
      />

      {/* 🔥 AI BUTTON WITH LOADING */}
      <button
        type="button"
        onClick={generateOfferAI}
        disabled={loading}
        style={{
          background: loading
            ? "#555"
            : "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white",
          padding: "12px",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        {loading ? "Generating..." : "✨ Generate with AI"}
      </button>

      <input
        name="couponCode"
        placeholder="Coupon Code"
        value={form.couponCode}
        onChange={handleChange}
      />

      <input
        name="expiryDate"
        placeholder="Expiry Date"
        value={form.expiryDate}
        onChange={handleChange}
      />

      <button onClick={sendMail} className="send-btn">
        Send Offer Mail
      </button>
    </div>
  );
};

export default AdminSendOfferMail;