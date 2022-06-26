import React, { createContext, useReducer,useState,useEffect,useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create a context
const AuthContext = createContext({});
const initialState = {
}
const AuthProvider = ({ children }) => {


      
  const [auth, setAuthState] = useState(initialState);

  // Get current auth state from AsyncStorage
  const getAuthState = async () => {
    try {
      
      const authDataString = await AsyncStorage.getItem("id_token");
      console.log("asdf**** 33",authDataString)
      
      // Configure axios headers
      //configureAxiosHeaders(authDataString, authData.phone);
      setAuthState(authDataString);
    } catch (err) {
      setAuthState({});
    }
  };

  // Update AsyncStorage & context state
  const setAuth = async (auth) => {
    try {
      await AsyncStorage.setItem("id_token", auth);
      // Configure axios headers
     // configureAxiosHeaders(auth.token, auth.phone);
      setAuthState(auth);
    } catch (error) {
      Promise.reject(error);
    }
  };

  useEffect(() => {
    getAuthState();
    console.log("&&&&&&&&&&&&&&&&  2 ",auth)
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };