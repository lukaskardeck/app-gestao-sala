import React, {createContext, useState} from 'react';
import {Alert} from 'react-native';

export const AuthContext = createContext({});

function AuthProvider({children}) {
  //const [user, setUser] = useState();
  const [user, setUser] = useState({
    name: 'Usuario 01',
    email: 'usuario01@hotmail.com',
  });

  function SignIn(userGoogle) {
    if (userGoogle.email.endsWith('@uesb.edu.br')) {
      setUser(userGoogle);
    }
    else {
      setUser(null);
      Alert.alert("Somente emails sob o domínio '@uesb.edu.br' são permitidos");
    }
  }

  function SignOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, SignIn, SignOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;