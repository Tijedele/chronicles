import { useContext } from "react";
import { UserContext } from "../content/userContext";

export const useUser = () => useContext(UserContext);