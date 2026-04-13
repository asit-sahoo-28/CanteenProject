// import React, { useState } from "react";
// import axios from "axios";
// import "./FoodSuggestion.css";

// const moods = [
//   { label: "😋 Hungry", value: "hungry" },
//   { label: "😄 Happy", value: "happy" },
//   { label: "😡 Angry", value: "angry" },
//   { label: "😴 Lazy", value: "lazy" },
//   { label: "💪 Healthy", value: "healthy" },
// ];

// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// const FoodSuggestion = ({ url }) => {
//   const [open, setOpen] = useState(false);
//   const [mode, setMode] = useState("mood");

//   const [result, setResult] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [thinking, setThinking] = useState(false);
//   const [selectedMood, setSelectedMood] = useState("");

//   // 🔥 CLEAR
//   const clearResult = () => {
//     setResult([]);
//   };

//   // 🔥 TOGGLE POPUP
//   const toggleOpen = () => {
//     setOpen((prev) => {
//       const newState = !prev;

//       if (!newState) {
//         setResult([]);
//         setLoading(false);
//         setThinking(false);
//         setSelectedMood("");
//       }

//       return newState;
//     });
//   };

//   // 🔥 FETCH FUNCTION
//   const fetchFood = async (payload) => {
//     try {
//       setLoading(true);
//       setThinking(true);
//       setResult([]);

//       await delay(2000); // AI feel

//       const res = await axios.post(
//         `${url}/api/food/ai-suggestion`,
//         payload
//       );

//       await delay(500);

//       if (res.data.success && res.data.data.length) {
//         setResult(res.data.data);
//       } else {
//         setResult(["😔 No food available"]);
//       }
//     } catch (err) {
//       console.log(err);
//       setResult(["⚠️ Something went wrong"]);
//     } finally {
//       setLoading(false);
//       setThinking(false);
//     }
//   };

//   // 🔥 MOOD
//   const getMoodFood = (mood) => {
//     if (loading) return;

//     setSelectedMood(mood);
//     clearResult();

//     fetchFood({ mood });
//   };

//   // 🔥 AUTO
//   const getAutoFood = () => {
//     if (loading) return;

//     setSelectedMood("");
//     clearResult();

//     const hour = new Date().getHours();

//     let time = "afternoon";
//     if (hour < 11) time = "morning";
//     else if (hour < 17) time = "afternoon";
//     else time = "night";

//     fetchFood({ mood: time });
//   };

//   return (
//     <div className={`ai-widget ${open ? "open" : ""}`}>
      
//       {/* FLOATING BUTTON */}
//       <div className="ai-circle" onClick={toggleOpen}>
//         🍔 AI
//       </div>

//       {/* PANEL */}
//       <div className="ai-panel">
//         <h3>🍽️ AI Food Assistant</h3>

//         {/* MODE */}
//         <div className="mode-switch">
//           <button
//             onClick={() => {
//               setMode("mood");
//               setSelectedMood("");
//               clearResult();
//             }}
//           >
//             Mood
//           </button>

//           <button
//             onClick={() => {
//               setMode("auto");
//               setSelectedMood("");
//               clearResult();
//             }}
//           >
//             Auto
//           </button>
//         </div>

//         {/* MOODS */}
//         {mode === "mood" && (
//           <div className="grid">
//             {moods.map((m, i) => (
//               <button
//                 key={i}
//                 disabled={loading}
//                 className={selectedMood === m.value ? "active-mood" : ""}
//                 onClick={() => getMoodFood(m.value)}
//               >
//                 {m.label}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* AUTO */}
//         {mode === "auto" && (
//           <button
//             className="auto-btn"
//             onClick={getAutoFood}
//             disabled={loading}
//           >
//             🤖 What should I eat today?
//           </button>
//         )}

//         {/* LOADING */}
//         {thinking && (
//           <div className="thinking-box">
//             <div className="loader"></div>
//             <p>🤖 AI is thinking...</p>
//           </div>
//         )}

//         {/* EMPTY */}
//         {!thinking && result.length === 0 && (
//           <p className="empty-msg">Select a mood or try auto 😊</p>
//         )}

//         {/* RESULT */}
//         <div className="result">
//           {result.map((item, i) => (
//             <div key={i} className="food-card">
//               🍽️ <span className="food-name">{item}</span>
//             </div>
//           ))}
//         </div>

//         {/* 🔄 TRY AGAIN */}
//         {result.length > 0 && !thinking && (
//           <button
//             className="refresh-btn"
//             onClick={() =>
//               mode === "auto"
//                 ? getAutoFood()
//                 : getMoodFood(selectedMood)
//             }
//           >
//             🔄 Try Again
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodSuggestion;











import React, { useState } from "react";
import axios from "axios";
import "./FoodSuggestion.css";

const moods = [
  { label: "😋 Hungry", value: "hungry" },
  { label: "😄 Happy", value: "happy" },
  { label: "😡 Angry", value: "angry" },
  { label: "😴 Lazy", value: "lazy" },
  { label: "💪 Healthy", value: "healthy" },
];

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const FoodSuggestion = ({ url }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("mood");
  const [result, setResult] = useState([]);
  const [thinking, setThinking] = useState(false);

  const clearResult = () => setResult([]);

  const toggleOpen = () => {
    setOpen((prev) => {
      const newState = !prev;
      if (!newState) {
        clearResult();
        setThinking(false);
      }
      return newState;
    });
  };

  const fetchFood = async (payload) => {
    try {
      setThinking(true);
      setResult([]);

      await delay(2000); // AI effect

      const res = await axios.post(
        `${url}/api/food/ai-suggestion`,
        payload
      );

      if (res.data.success) {
        setResult(res.data.data);
      } else {
        setResult(["😔 No suggestion"]);
      }
    } catch (err) {
      console.log(err);
      setResult(["⚠️ Error"]);
    } finally {
      setThinking(false);
    }
  };

  const getMoodFood = (mood) => {
    clearResult();
    fetchFood({ mood });
  };

  const getAutoFood = () => {
    clearResult();

    const hour = new Date().getHours();
    let time = "afternoon";

    if (hour < 11) time = "morning";
    else if (hour < 17) time = "afternoon";
    else time = "night";

    fetchFood({ mood: time });
  };

  return (
    <div className={`ai-widget ${open ? "open" : ""}`}>
      
      {/* BUTTON */}
      <div className="ai-circle" onClick={toggleOpen}>
        🍔 AI
      </div>

      {/* PANEL */}
      <div className="ai-panel">
        <h3>🍽️ AI Food Assistant</h3>

        {/* MODE */}
        <div className="mode-switch">
          <button
            onClick={() => {
              setMode("mood");
              clearResult();
            }}
          >
            Mood
          </button>

          <button
            onClick={() => {
              setMode("auto");
              clearResult();
            }}
          >
            Auto
          </button>
        </div>

        {/* MOOD */}
        {mode === "mood" && (
          <div className="grid">
            {moods.map((m, i) => (
              <button key={i} onClick={() => getMoodFood(m.value)}>
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* AUTO */}
        {mode === "auto" && (
          <button className="auto-btn" onClick={getAutoFood}>
            🤖 What should I eat today?
          </button>
        )}

        {/* LOADING */}
        {thinking && (
          <div className="thinking-box">
            <div className="loader"></div>
            <p>🤖 AI is thinking...</p>
          </div>
        )}

        {/* RESULT */}
        <div className="result">
          {result.map((item, i) => (
            <div key={i} className="food-card">
              🍽️ <span className="food-name">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodSuggestion;