


import React from "react";
import "./Header.css";

const Header = ({ foodRef }) => {
  const scrollToFood = () => {
    foodRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="header">
      <div className="header-overlay"></div>
      <div className="header-glow"></div>

      <div className="header-content">
        <h2 className="header-title">
          Order your favorite canteen meals with ease
        </h2>

        <p className="header-subtitle">
          Skip long queues and enjoy hassle-free food ordering. Order breakfast,
          lunch, snacks, or beverages and get fresh meals on time.
        </p>

        <button className="header-btn" onClick={scrollToFood}>
          View Menu
        </button>
      </div>
    </section>
  );
};

export default Header;











// import React from "react";
// import "./Header.css";

// const Header = ({ foodRef }) => {
//   const scrollToFood = () => {
//     foodRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   return (
//     <section className="header">
//       <div className="header-overlay"></div>
//       <div className="header-glow"></div>

//       <div className="header-content">
//         <h2 className="header-title">
//           Order your favorite canteen meals with ease
//         </h2>

//         <p className="header-subtitle">
//           Skip long queues and enjoy hassle-free food ordering. Order breakfast,
//           lunch, snacks, or beverages and get fresh meals on time.
//         </p>

//         <button className="header-btn" onClick={scrollToFood}>
//           View Menu
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Header;