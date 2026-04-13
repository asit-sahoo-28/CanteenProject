
// AdminAddOffer.jsx
import React, { useState } from "react";
import axios from "axios";
import "./AdminAddOffer.css";
import { toast } from "react-toastify";

const AdminAddOffer = () => {
  const url = import.meta.env.VITE_BACKEND_URL; // e.g. http://localhost:4000
  const token = localStorage.getItem("adminToken");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    couponCode: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscountAmount: "",
    isFirstOrderOnly: false,
    isFestivalOffer: false,
    startDate: "",
    endDate: "",
    isActive: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clean numeric fields
      const cleanedData = {
        ...formData,
        discountValue: Number(formData.discountValue),
        minOrderAmount: formData.minOrderAmount ? Number(formData.minOrderAmount) : 0,
        maxDiscountAmount: formData.maxDiscountAmount ? Number(formData.maxDiscountAmount) : undefined,
      };

      const res = await axios.post(`${url}/api/offers/add`, cleanedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        toast.success("Offer Created Successfully ✅");
        setFormData({
          title: "",
          description: "",
          couponCode: "",
          discountType: "percentage",
          discountValue: "",
          minOrderAmount: "",
          maxDiscountAmount: "",
          isFirstOrderOnly: false,
          isFestivalOffer: false,
          startDate: "",
          endDate: "",
          isActive: true,
        });
      } else {
        toast.error(res.data.message || "Error creating offer ❌");
      }
    } catch (error) {
      console.error("Frontend error:", error);
      toast.error("Server Error 🚨");
    }
  };

  return (
    <div className="admin-offer-container">
      <div className="admin-offer-card">
        <h2>Create New Offer 🎁</h2>
        <form onSubmit={handleSubmit} className="admin-offer-form">
          {/* Title */}
          <div className="form-group">
            <label>Title</label>
            <input name="title" value={formData.title} onChange={handleChange} required />
          </div>

          {/* Description */}
          <div className="form-group">
            <label>Description</label>
            <input name="description" value={formData.description} onChange={handleChange} />
          </div>

          {/* Coupon Code */}
          <div className="form-group">
            <label>Coupon Code</label>
            <input name="couponCode" placeholder="SAVE20" value={formData.couponCode} onChange={handleChange} />
          </div>

          {/* Discount */}
          <div className="form-row">
            <div className="form-group">
              <label>Discount Type</label>
              <select name="discountType" value={formData.discountType} onChange={handleChange}>
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>
            </div>
            <div className="form-group">
              <label>Discount Value</label>
              <input name="discountValue" type="number" value={formData.discountValue} onChange={handleChange} required />
            </div>
          </div>

          {/* Order Amounts */}
          <div className="form-row">
            <div className="form-group">
              <label>Minimum Order</label>
              <input name="minOrderAmount" type="number" value={formData.minOrderAmount} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Max Discount</label>
              <input name="maxDiscountAmount" type="number" value={formData.maxDiscountAmount} onChange={handleChange} />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="isFirstOrderOnly" checked={formData.isFirstOrderOnly} onChange={handleChange} />
              First Order Only
            </label>
            <label>
              <input type="checkbox" name="isFestivalOffer" checked={formData.isFestivalOffer} onChange={handleChange} />
              Festival Offer
            </label>
            <label>
              <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
              Active
            </label>
          </div>

          {/* Dates */}
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input name="startDate" type="datetime-local" value={formData.startDate} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input name="endDate" type="datetime-local" value={formData.endDate} onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="submit-btn">Create Offer</button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddOffer;

