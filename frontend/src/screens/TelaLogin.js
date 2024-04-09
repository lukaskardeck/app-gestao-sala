import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
//import auth from '@react-native-firebase/auth';
import { onGoogleButtonPress } from '../services/AuthGoogle';
import { AuthContext } from '../contexts/Auth';

GoogleSignin.configure({
  webClientId:
    '1018191521816-4q2730r9ssca4b5cq68omsu3uq7qns27.apps.googleusercontent.com',
});

function TelaLogin() {
  const { SignIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.jpg')}
        style={styles.imgBG}
        resizeMode="cover">
        <View style={styles.boxTitle}>
          <Text style={styles.title}>Seja Bem-Vindo!</Text>
          <Text style={styles.pTitle}>
            Este é o aplicativo de gestão de espaços{'\n'}da UESB
          </Text>
        </View>
        <Image
          source={require('../assets/img-book.png')}
          style={styles.imgBook}
        />
        <TouchableOpacity onPress={async () => {
          const user = await onGoogleButtonPress();
          await SignIn(user);
          //await SignIn('@uesb.edu.br');
        }}>
          <Image
            source={require('../assets/img-login-google.png')}
            style={styles.imgLogin}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/uesb-logo.png')}
          style={styles.imgLogo}
        />
      </ImageBackground>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //around
  },

  imgBG: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  boxTitle: {
    marginBottom: 40,
  },

  title: {
    fontSize: 40,
    textAlign: 'center',
    color: '#0805A3',
  },

  pTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#0805A3',
  },

  imgBook: {
    width: 250,
    height: 250,
  },

  imgLogin: {
    resizeMode: 'center',
  },

  imgLogo: {
    resizeMode: 'center',
  },
});

export default TelaLogin;
