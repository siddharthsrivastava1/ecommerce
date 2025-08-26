// context/LoaderContext.js
import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ loading, showLoader, hideLoader }}>
      {children}
      {loading && (
        <div className="global-loader-overlay">
          <div className="spinner" />
        </div>
      )}
    </LoaderContext.Provider>
  );
};

// Custom hook to use the context
export const useLoader = () => useContext(LoaderContext);
