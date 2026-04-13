
import React, { useContext } from "react";
import "./popular.css";
import { StoreContext } from "../../pages/context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const Popular = () => {
  const { food_list } = useContext(StoreContext);

  const popularItems = food_list.slice(0, 4);

  return (
    <div className="popular-items">
      <h2>🔥 Popular Items</h2>

      <div className="popular-items-list">
        {popularItems.map((item) => {
          const stockLeft = Math.floor(Math.random() * 5) + 1;

          return (
            <div className="popular-card" key={item._id}>
              {/* Selling Fast Badge */}
              <span className="selling-fast">Selling Fast</span>

              {/* Low Stock Badge */}
              <span className="low-stock">
                Only {stockLeft} left
              </span>

              <FoodItem
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
