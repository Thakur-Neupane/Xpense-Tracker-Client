import { createContext, useContext, useEffect, useState } from "react";
import { fetchTrans } from "./helpers/axiosHelper";
import { toast } from "react-toastify";

const UserContext = createContext();

//provides data to all the components
export const UserProvder = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    userStr && setLoggedInUser(JSON.parse(userStr));
  }, []);

  const getUserTransactions = async () => {
    const { status, message, trans } = await fetchTrans();

    status === "error" ? toast.error(message) : setTransactions(trans);
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        transactions,
        setTransactions,
        getUserTransactions,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// allow any component to consume the data
export const useUser = () => useContext(UserContext);
