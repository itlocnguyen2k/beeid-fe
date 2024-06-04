import StoreContext from "./StoreContext";
import { useContext } from "react";

export const useStore = () => {
  return useContext(StoreContext);
};
