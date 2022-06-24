import React, {createContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [auth, toggleAuth] = useState({
    isAuth: false,
    user:null,
    status: 'pending',
  });

  //const [source] = useState(axios.CancelToken.source());

  useEffect(() => {

    const token = localStorage.getItem('token');

    if (token !== null){

      const decodedToken = jwtDecode(token);

      getUserData(decodedToken.sub, token).then();

    }
    else{
      toggleAuth({
        user: null,
        status: 'done',
      });
    }

    // return function cleanup() {
    //   source.cancel(); // <--- request annuleren
    // }

  },[]);


  const history = useHistory();

  function login(token) {
    localStorage.setItem('token', token);

    const decodedToken = jwtDecode(token);

    getUserData(decodedToken.sub, token)
        .then(() => history.push('/'));
  }


  function logout() {
    localStorage.removeItem('token');

    toggleAuth({
      isAuth: false,
      user: null
    });

    history.push('/');
  }

  async function getUserData(id, token){

    try{
      const data = await axios.get(`http://localhost:3000/600/users/${id}`,{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //cancelToken:source.token,
      });

      toggleAuth({
        isAuth: true,
        user: {
          username: data.data.username,
          email: data.data.email,
          id: data.data.id,
        },
        status: 'done'
      });

    } catch (e){
      console.error(e);
    }
  }

  const contextData = {
    ...auth,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {auth.status === 'pending'
      ? <p>Loading....</p>
      : children
      }
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;