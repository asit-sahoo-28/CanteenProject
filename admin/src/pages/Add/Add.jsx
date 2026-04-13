


// import React, { useEffect, useState } from "react";
// import "./Add.css";
// import { assets } from "../../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Add = ({ url }) => {
//   const [image, setImage] = useState(null);

//   const [data, setData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "Salad",
//   });

//   // Handle input change
//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Submit form
//   const onSubmitHandler = async (event) => {
//     event.preventDefault();

//     if (!image) {
//       toast.error("Please upload an image");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", data.name);
//       formData.append("description", data.description);
//       formData.append("price", Number(data.price));
//       formData.append("category", data.category); // ✅ FIXED
//       formData.append("image", image);

//       const response = await axios.post(`${url}/api/food/add`, formData);

//       if (response.data.success) {
//         setData({
//           name: "",
//           description: "",
//           price: "",
//           category: "Salad",
//         });
//         setImage(null);
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     console.log(data);
//   }, [data]);

//   return (
//     <div className="add">
//       <form className="flex-col" onSubmit={onSubmitHandler}>
        
//         {/* Image Upload */}
//         <div className="add-img-upload flex-col">
//           <p>Upload Image</p>
//           <label htmlFor="image">
//             <img
//               src={image ? URL.createObjectURL(image) : assets.upload_area}
//               alt="Upload"
//             />
//           </label>
//           <input
//             type="file"
//             id="image"
//             hidden
//             required
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         </div>

//         {/* Product Name */}
//         <div className="add-product-name flex-col">
//           <p>Product Name</p>
//           <input
//             type="text"
//             name="name"
//             placeholder="Type here"
//             value={data.name}
//             onChange={onChangeHandler}
//             required
//           />
//         </div>

//         {/* Description */}
//         <div className="add-product-description flex-col">
//           <p>Product Description</p>
//           <textarea
//             name="description"
//             rows="6"
//             placeholder="Write content here"
//             value={data.description}
//             onChange={onChangeHandler}
//             required
//           ></textarea>
//         </div>

//         {/* Category & Price */}
//         <div className="add-category-price">
//           <div className="add-category flex-col">
//             <p>Product Category</p>
//             <select
//               name="category"
//               value={data.category}
//               onChange={onChangeHandler}
//             >
              
//               <option value="All">All</option>
// <option value="Breakfast">Breakfast</option>
// <option value="Snacks">Snacks</option>
// <option value="Meals">Meals</option>
// <option value="Veg">Veg</option>
// <option value="Non-Veg">Non-Veg</option>
// <option value="Fast Food">Fast Food</option>
// <option value="Beverages">Beverages</option>
// <option value="Desserts">Desserts</option>
// <option value="Healthy Food">Healthy Food</option>
// <option value="Combos / Thali">Combos / Thali</option>

//             </select>
//           </div>

//           <div className="add-price flex-col">
//             <p>Product Price</p>
//             <input
//               type="number"
//               name="price"
//               placeholder="₹20"
//               value={data.price}
//               onChange={onChangeHandler}
//               required
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <button type="submit" className="add-btn">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Add;













import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false); // 🔥 NEW

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ AI GENERATE DESCRIPTION WITH LOADING
const generateAI = async () => {
  if (!data.name) {
    toast.error("Enter product name first");
    return;
  }

  try {
    setLoading(true); // start loading

    const res = await axios.post(`${url}/api/food/ai-description`, {
      name: data.name,
    });

    // 🔥 ADD FAKE DELAY (important)
    setTimeout(() => {
      if (res.data.success) {
        setData((prev) => ({
          ...prev,
          description: res.data.data,
        }));
        toast.success("AI Description Generated");
      } else {
        toast.error(res.data.message);
      }

      setLoading(false); // stop loading after delay
    }, 1500); // ⏳ 1.5 seconds delay

  } catch (err) {
    console.log(err);
    toast.error("AI failed");
    setLoading(false);
  }
};

  // ✅ SUBMIT FORM
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        
        {/* IMAGE */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* NAME */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* DESCRIPTION + AI */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>

<button
  type="button"
  onClick={generateAI}
  disabled={loading}
  className={`ai-btn ${loading ? "loading" : ""}`}
>
  {loading ? "⏳ Generating..." : "✨ Generate with AI"}
</button>

          <textarea
            name="description"
            rows="6"
            placeholder="Write content here"
            value={data.description}
            onChange={onChangeHandler}
            required
          ></textarea>
        </div>

        {/* CATEGORY + PRICE */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="All">All</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Snacks">Snacks</option>
              <option value="Meals">Meals</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Beverages">Beverages</option>
              <option value="Desserts">Desserts</option>
              <option value="Healthy Food">Healthy Food</option>
              <option value="Combos / Thali">Combos / Thali</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="₹20"
              value={data.price}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;