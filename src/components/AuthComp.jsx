import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../UserContext";

export const AuthComp = ({ children }) => {
  const { loggedInUser } = useUser();
  return loggedInUser?._id ? children : <Navigate to="/" />;
};
