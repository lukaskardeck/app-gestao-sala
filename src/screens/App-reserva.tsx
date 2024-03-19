import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '1018191521816-4q2730r9ssca4b5cq68omsu3uq7qns27.apps.googleusercontent.com',
});

function App() {
  async function onGoogleButtonPress() {
    try {
      // Verificar se o usuário está autenticado
      const isSignedIn = await GoogleSignin.isSignedIn();

      // Se o usuário estiver autenticado, limpar as credenciais armazenadas em cache
      if (isSignedIn) {
        await GoogleSignin.revokeAccess();
      }

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);

      console.log('user sign in successful');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./src/assets/bg.jpg')}
        style={styles.imgBG}
        resizeMode="cover">
        <View style={styles.boxTitle}>
          <Text style={styles.title}>Seja Bem-Vindo!</Text>
          <Text style={styles.pTitle}>
            Este é o aplicativo de gestão de espaços{'\n'}da UESB
          </Text>
        </View>
        <Image
          source={require('./src/assets/img-book.png')}
          style={styles.imgBook}
        />
        <TouchableOpacity onPress={onGoogleButtonPress}>
          <Image
            source={require('./src/assets/img-login-google.png')}
            style={styles.imgLogin}
          />
        </TouchableOpacity>
        <Image
          source={require('./src/assets/uesb-logo.png')}
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

export default App;
