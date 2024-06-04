import StoreContext from "./StoreContext";
import { useReducer } from "react";
import reducer, { initState } from "./StoreReducer";

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  return <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
