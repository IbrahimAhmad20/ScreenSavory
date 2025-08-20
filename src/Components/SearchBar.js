import { useEffect, useRef } from "react";

export function SearchBar({ query, setQuery, setSelectedId }) {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        setQuery("");
        inputEl.current.focus();
        setSelectedId(null);
      }
    }
    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
