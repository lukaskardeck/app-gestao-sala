import 'react-native-gesture-handler';
import React from 'react';
import {
  //StyleSheet,
} from 'react-native';
import { Router } from './src/routes/Router';
import AuthProvider from './src/contexts/Auth';

function App() {

  return (
    <AuthProvider>
      <Router/>
    </AuthProvider>
  );
}

export default App;
