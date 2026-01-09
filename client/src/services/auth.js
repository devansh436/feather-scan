import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../lib/firebase";

// new login
export const signup = (email, password) => {
    try {
        const user = createUserWithEmailAndPassword(auth, email, password);
        return user;
    } catch (err) {
        console.error(err);
    }
};

// existing account
export const login = (email, password) => {
    try {
        // signs with given creds, if correct user session created  
        const user = signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (err) {
        console.error(err);
    }
};

// google login (oauth)
export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    try {
        // opens google signin popup
        const user = signInWithPopup(auth, provider);
        return user;
    } catch (err) {
        console.error(err);
    }
}

// clears session locally + on firebase
export const logout = () => signOut(auth);