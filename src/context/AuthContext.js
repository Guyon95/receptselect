import React, {createContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
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
      getUserData(token).then();
    }
    else{
      toggleAuth({
        isAuth: false,
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

    getUserData(token)
        .then(() => history.push('/'));
  }


  function logout() {
    localStorage.removeItem('token');

    toggleAuth({
      isAuth: false,
      user: null,
      status: 'done'
    });

    history.push('/');
  }

  async function getUserData(token){

    try{
      const data = await axios.get(`https://frontend-educational-backend.herokuapp.com/api/user`,{
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
        },
        status: 'done'
      });

    } catch (e){
      console.error(e);
    }
  }

  //apikeys
  //e4155c89a5914433a598f82f4041dd76
  //ad94f2ca2a5b46658368f8e3af1f0eca
  //665f6e1d6862458991d64691af3ef97f
  //8a5593f7d89742408c9a05a9a200d3c1
  //3755023c41ec48de9cb4752756b64fe4

  const contextData = {
    ...auth,
    login: login,
    logout: logout,
    apiKey: 'e4155c89a5914433a598f82f4041dd76',
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