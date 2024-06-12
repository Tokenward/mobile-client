import { auth } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";
import { throwError, handleError, handleFirebaseError } from "../util/error";

/**
 * Function to save user data locally using AsyncStorage
 * @param {Object} data The user data to save
 */
const saveDataLocally = async (data) => {
    try {
        await AsyncStorage.setItem('@userVaultData', JSON.stringify(data));
    } catch (error) {
        console.error('Error saving data locally:', error);
    }
};

/**
 * Function to get user data from local storage
 * @returns {Promise<Object>} The user data from local storage
 */
export const getLocalData = async () => {
    try {
        const jsonData = await AsyncStorage.getItem('@userVaultData');
        return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error('Error retrieving local data:', error);
    }
};

/**
 * Function to change the user's email
 * @param {string} newEmail The new email address to set
 * @returns {Promise<void>}
 */
export const changeUserEmail = async (newEmail) => {
  const user = auth.currentUser;

  if (user) {
      if (!user.emailVerified) {
          Alert.alert('Email not verified','Please verify your email before changing email');
      }

      try {
          await updateEmail(user, newEmail);
          console.log('Email updated successfully');
      } catch (err) {
        const errorMessage = handleFirebaseError(err);
        Alert.alert('E-mail verification error', errorMessage);
      }
  } else {
      throwError('User not authenticated', 'AUTH_ERROR');
  }
};

  
  export const signup = (email, password) => {
    if (email!== '' && password!== '') {
      console.log("Registering with Email and Password");
      createUserWithEmailAndPassword(auth, email, password)
       .then((userCredential) => {
          sendEmailVerification(userCredential.user);
        })
       .catch((err) => {
          const errorMessage = handleFirebaseError(err);
          Alert.alert('Signup error', errorMessage);
        });
    } else {
      Alert.alert('Signup error', 'Email and password must not be empty')
    }
  }

export const login = (email, password) => {
    if (email!== '' && password !== '') {
        console.log('Logging in with Email and Password');
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                router.push('/vault');
            })
            .catch((err) => {
                const errorMessage = handleFirebaseError(err);
                Alert.alert('Login error', errorMessage);
            });
    } else {
        Alert.alert('Login error', 'Email and password must not be empty')
    }
}