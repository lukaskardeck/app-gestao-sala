import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export async function onGoogleButtonPress() {
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
      const {idToken, user} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);

      console.log('user sign in successful');
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
    }
}
