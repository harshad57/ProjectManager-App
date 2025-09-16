import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const backendurl = import.meta.env.VITE_BACKEND_URL;

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authuser, setauthuser] = useState(null);

  // 🔹 Load user/token from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // ✅ set token for axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${parsedUser.token}`;
    }
  }, []);

  const checkauth = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/check`, {
        withCredentials: true
      });
      setauthuser(data);
    } catch (err) {
      console.error(err);
    }
  }

  const register = async (formData) => {
    try {
      const { data } = await axios.post(`${backendurl}/api/user/register`, formData);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ set axios token
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (err) {
      console.error(err);
      throw err.response?.data?.message || "Register failed";
    }
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(`${backendurl}/api/user/login`, credentials);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      // ✅ set axios token
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      return data;
    } catch (err) {
      console.error(err);
      throw err.response?.data?.message || "Login failed";
    }
  };

  const editusername = async (update) => {
      try {
        const { data } = await axios.put(
          `${backendurl}/api/user/editname`,
          update, {
        withCredentials: true,
      });
        setauthuser(data);
        return data;
      } catch (err) {
        console.log(err);
  }
  };

  const updatepassword = async (oldpassword, newpassword, confirmpassword) => {
  try {
    const { data } = await axios.put(
      `${backendurl}/api/user/updatepassword`,
      { oldpassword, newpassword, confirmpassword },
      { withCredentials: true }
    );
    return { success: true, message: data.message };
  } catch (err) {
    return { success: false, message: err.response?.data?.error || "Error updating password" };
  }
};

  const logout = async () => {
    try {
      await axios.post(`${backendurl}/api/user/logout`);
      setUser(null);
      localStorage.removeItem("user");

      // ❌ remove axios token
      delete axios.defaults.headers.common["Authorization"];
    } catch (err) {
      console.error(err);
      throw err.response?.data?.message || "Logout failed";
    }
  };

  const deleteaccount = async () => {
  try {
    await axios.delete(`${backendurl}/api/user/deleteaccount`, { withCredentials: true });
    setauthuser(null);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

  useEffect(() => {
    checkauth();
  }, [])

  return (
    <UserContext.Provider value={{ user, register, login, editusername, updatepassword, logout, deleteaccount, authuser, checkauth }}>
      {children}
    </UserContext.Provider>
  );
};
