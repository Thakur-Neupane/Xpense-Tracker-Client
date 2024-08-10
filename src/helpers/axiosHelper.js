import axios from "axios";
const rootAPI = import.meta.env.VITE_APP_ROOTAPI;
const userEP = rootAPI + "/users";
const TransEP = rootAPI + "/transactions";

const getUserId = () => {
  const userStr = localStorage.getItem("user");
  const userObj = userStr ? JSON.parse(userStr) : null;
  return userObj?._id ?? null;
};

// #========== user api

export const postNewUser = async (userObj) => {
  try {
    const { data } = await axios.post(userEP, userObj);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const userLogin = async (loginInfo) => {
  try {
    const { data } = await axios.post(userEP + "/login", loginInfo);
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

// #======= transactions api

export const postNewTrans = async (transObj) => {
  try {
    const userId = getUserId();

    if (!userId) {
      throw new Error("User id doesn't exist! Login and try again");
    }
    const { data } = await axios.post(TransEP, transObj, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const fetchTrans = async () => {
  try {
    const userId = getUserId();

    if (!userId) {
      throw new Error("User id doesn't exist! Login and try again");
    }
    const { data } = await axios.get(TransEP, {
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const delteTrans = async (idsToDelete) => {
  try {
    const userId = getUserId();

    if (!userId) {
      throw new Error("User id doesn't exist! Login and try again");
    }
    const { data } = await axios.delete(TransEP, {
      data: idsToDelete,
      headers: {
        Authorization: userId,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: error.message,
    };
  }
};
