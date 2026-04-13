


// import { useContext, useEffect, useState } from "react";
// import { Search, X } from "lucide-react";
// import axios from "axios";
// import { StoreContext } from "../../context/StoreContext";
// import "./Serach.css";

// const Serach = () => {
//   const [query, setQuery] = useState("");
//   const { setSearchResults, setSearchActive, url } =
//     useContext(StoreContext);

//   useEffect(() => {
//     if (!query) {
//       setSearchActive(false);
//       setSearchResults([]);
//       return;
//     }

//     setSearchActive(true);

//     const timer = setTimeout(async () => {
//       const res = await axios.get(`${url}/api/food/search?q=${query}`);
//       setSearchResults(res.data);
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [query]);

//   return (
//     <div className="search-bar">
//       <Search size={18} />
//       <input
//         type="text"
//         placeholder="Search for dishes..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       {query && <X size={18} onClick={() => setQuery("")} />}
//     </div>
//   );
// };

// export default Serach;

import { useContext, useEffect, useState } from "react";
import { Search, X } from "lucide-react"; // Search and clear icons
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./Serach.css"; // matches your CSS

const Serach = () => {
  const [query, setQuery] = useState("");      // user input
  const [results, setResults] = useState([]);  // search results

  const { setSearchActive, url } = useContext(StoreContext);

  useEffect(() => {
    if (!query || query.trim().length < 1) {
      setSearchActive(false);
      setResults([]);
      return;
    }

    setSearchActive(true);

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(`${url}/api/food/search?q=${encodeURIComponent(query)}`);
        setResults(res.data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, url, setSearchActive]);

  return (
    <div className="search-wrapper"> {/* matches your CSS */}
      <div className="search-bar">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search for dishes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && <X size={18} onClick={() => setQuery("")} />}
      </div>

      {/* Results container */}
      {results.length > 0 && (
        <div className="results"> {/* matches your CSS */}
          {results.map((item) => (
            <div key={item._id} className="result-item"> {/* matches your CSS */}
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => (e.target.src = "/fallback.png")}
              />
              <div>
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results */}
      {results.length === 0 && query.trim() !== "" && (
        <div className="results no-result">
          No results found
        </div>
      )}
    </div>
  );
};

export default Serach;