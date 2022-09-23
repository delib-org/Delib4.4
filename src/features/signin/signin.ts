import { signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../control/firebase/config";
export function signInAnonym() {
  signInAnonymously(auth)
    .then(() => {
      console.info("user signed in anonymously");
    })
    .catch((error) => {
      console.error(error);
    });
}

export function listenToAuth(dispatch: Function) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      const { uid, photoURL, isAnonymous, emailVerified, email, displayName } =
        user;
      dispatch({
        uid,
        photoURL,
        isAnonymous,
        emailVerified,
        email,
        displayName,
      });
    } else {
      console.info("User is signed out");
    }
  });
}
