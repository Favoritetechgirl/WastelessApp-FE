import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    displayPicture: ''
  })

  useEffect(() => {
    console.log('Current User', user);
    toast.success('App Launched')
  }, [])

  const login = async (email, password) => {
    const api = "";
    const payload = { email, password };

    try {
      const response = await axios.post(api, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response", response);
      setUser(response.data);

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred during login";

      toast.error(message);
    }
  };


  const signUp = async (email, password, firstName, lastName) => {
    const api = ''
    const payload = { email, password, firstName, lastName }

    try {
      const response = await axios.post(api, payload, {
        headers: {
          "Content-Type": 'application/json'
        }
      })

      console.log("Response from login", response);
      //this mechanism will chnage
      setUser(response.data)

    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An error occurred during login";

      toast.error(message);
    }

  }



  const value = {
    login, signUp, user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}
