import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const StatesContext = createContext();

export default StatesContext;

export function StatesProvider({ children }) {
  const [citiesLoaded, setCitiesLoaded] = useState(false);

  const statesValue = useMemo(() => ({
    citiesLoaded,
    setCitiesLoaded,
  }));

  return (
    <StatesContext.Provider value={statesValue}>
      {children}
    </StatesContext.Provider>
  );
}

StatesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
