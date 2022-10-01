import React, { useState , useEffect } from "react";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import { Routes , Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  
  const setAuth= (boolean)=>{
    setIsAuthenticated(boolean);
  }

  const isAuth = async()=>{
    try {
      const response = await fetch(`${BASE_URL}auth/is-verify`,{
        method:"GET",
        headers:{token:localStorage.token}
      })
      const parseResponse = await response.json();
      parseResponse === true ? setAuth(true): setAuth(false);
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(()=>{
    console.log("Test");
    isAuth()
  })

  return (
    <>
    <Routes>
      <Route path="/login" element={!isAuthenticated?<Login setAuth={setAuth}/>:<Navigate to="/dashboard"/>}/>
      <Route path="/register" element={!isAuthenticated?<Register  setAuth={setAuth}/>:<Navigate to="/dashboard"/>}/>
      <Route path="/dashboard" element={isAuthenticated?<Dashboard setAuth={setAuth}/>:<Navigate to="/login"/>}/>
      <Route path="*" element = {<Navigate to="/login"/>}/>
    </Routes>
    </>
  );
}

export default App;