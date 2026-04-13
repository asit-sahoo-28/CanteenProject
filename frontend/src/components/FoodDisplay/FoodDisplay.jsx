

// import React, {
//   useContext,
//   forwardRef,
//   useState,
//   useMemo,
// } from "react";
// import "./FoodDisplay.css";
// import { StoreContext } from "../../context/StoreContext";
// import FoodItem from "../FoodItem/FoodItem";

// const FoodDisplay = forwardRef(({ category }, ref) => {
//   const { food_list, searchResults, searchActive } =
//     useContext(StoreContext);

//   // 🔹 New Local States (does not break anything)
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceSort, setPriceSort] = useState("");

//   const displayList = searchActive ? searchResults : food_list;

//   // 🔹 Filter + Sort Logic (safe & optimized)
//   const processedList = useMemo(() => {
//     let filtered = displayList.filter((item) => {
//       // Existing category prop support
//       if (category !== "All" && category !== item.category) {
//         return false;
//       }

//       // New horizontal filter category
//       if (
//         selectedCategory !== "All" &&
//         selectedCategory !== item.category
//       ) {
//         return false;
//       }

//       return true;
//     });

//     // Price Sorting
//     if (priceSort === "low-high") {
//       filtered.sort((a, b) => a.price - b.price);
//     } else if (priceSort === "high-low") {
//       filtered.sort((a, b) => b.price - a.price);
//     }

//     return filtered;
//   }, [displayList, category, selectedCategory, priceSort]);

//   return (
//     <div className="food-display" ref={ref}  id='explor-menu'>
//       <h2>
//         {searchActive ? "Search Results" : "Top dishes near you"}
//       </h2>

//       {/* 🔥 HORIZONTAL FILTER BAR */}
//       <div
//         style={{
//           display: "flex",
//           gap: "25px",
//           alignItems: "center",
//           marginBottom: "30px",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* Category Filter */}
//         <div>
//           <label style={{ fontWeight: "600" }}>Category:</label>
//           <select
//             style={{
//               padding: "6px 12px",
//               marginLeft: "10px",
//               borderRadius: "6px",
//             }}
//             onChange={(e) =>
//               setSelectedCategory(e.target.value)
//             }
//           >
//             <option value="All">All</option>
//             <option value="Breakfast">Breakfast</option>
//             <option value="Snacks">Snacks</option>
//             <option value="Meals">Meals</option>
//             <option value="Veg">Veg</option>
//             <option value="Non-Veg">Non-Veg</option>
//             <option value="Fast Food">Fast Food</option>
//             <option value="Beverages">Beverages</option>
//             <option value="Desserts">Desserts</option>
//             <option value="Healthy Food">
//               Healthy Food
//             </option>
//             <option value="Combos / Thali">
//               Combos / Thali
//             </option>
//           </select>
//         </div>

//         {/* Price Filter */}
//         <div>
//           <label style={{ fontWeight: "600" }}>Price:</label>
//           <select
//             style={{
//               padding: "6px 12px",
//               marginLeft: "10px",
//               borderRadius: "6px",
//             }}
//             onChange={(e) => setPriceSort(e.target.value)}
//           >
//             <option value="">None</option>
//             <option value="low-high">
//               Low → High
//             </option>
//             <option value="high-low">
//               High → Low
//             </option>
//           </select>
//         </div>
//       </div>

//       {/* 🔥 FOOD GRID (UNCHANGED STRUCTURE) */}
//       <div className="food-display-list">
//         {processedList.length > 0 ? (
//           processedList.map((item) => (
//             <FoodItem
//               key={item._id}
//               id={item._id}
//               name={item.name}
//               description={item.description}
//               price={item.price}
//               image={item.image}
//             />
//           ))
//         ) : (
//           searchActive && (
//             <p
//               style={{
//                 gridColumn: "1 / -1",
//                 textAlign: "center",
//                 marginTop: "30px",
//               }}
//             >
//               No dishes found 🍽️
//             </p>
//           )
//         )}
//       </div>
//     </div>
//   );
// });

// export default FoodDisplay;








import React, {
  useContext,
  forwardRef,
  useState,
  useMemo,
} from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../pages/context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = forwardRef(({ category }, ref) => {
  const { food_list, searchResults, searchActive } =
    useContext(StoreContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceSort, setPriceSort] = useState("");

  const displayList = searchActive ? searchResults : food_list;

  const processedList = useMemo(() => {
    let filtered = displayList.filter((item) => {
      if (category !== "All" && category !== item.category) return false;
      if (selectedCategory !== "All" && selectedCategory !== item.category)
        return false;
      return true;
    });

    if (priceSort === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [displayList, category, selectedCategory, priceSort]);

  return (
    <div className="food-display" ref={ref} id="explor-menu">
      <h2>{searchActive ? "Search Results" : "Top dishes near you"}</h2>

      {/* FILTER BAR */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <label style={{ fontWeight: "600" }}>Category:</label>
          <select
            style={{
              padding: "6px 12px",
              marginLeft: "10px",
              borderRadius: "6px",
            }}
            onChange={(e) => setSelectedCategory(e.target.value)}
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

        <div>
          <label style={{ fontWeight: "600" }}>Price:</label>
          <select
            style={{
              padding: "6px 12px",
              marginLeft: "10px",
              borderRadius: "6px",
            }}
            onChange={(e) => setPriceSort(e.target.value)}
          >
            <option value="">None</option>
            <option value="low-high">Low → High</option>
            <option value="high-low">High → Low</option>
          </select>
        </div>
      </div>

      {/* FOOD GRID */}
      <div className="food-display-list">
        {processedList.length > 0 ? (
          processedList.map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
              stock={item.stock}
              isFlashSale={item.isFlashSale}
              isAvailable={item.isAvailable}   
            />
          ))
        ) : (
          searchActive && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                marginTop: "30px",
              }}
            >
              No dishes found 🍽️
            </p>
          )
        )}
      </div>
    </div>
  );
});

export default FoodDisplay;





