import { auth } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";
import { throwError, handleFirebaseError } from "../util/error";

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
            Alert.alert('Email not verified', 'Please verify your current email before changing to a new email');
            return;
        }

        try {
            await updateEmail(user, newEmail);
            await sendVerificationEmail(newEmail);
            Alert.alert('Verification link sent', 'Please check your new email to verify.');
        } catch (err) {
            const errorMessage = handleFirebaseError(err);
            Alert.alert('E-mail verification error', errorMessage);
        }
    } else {
        throwError('User not authenticated', 'AUTH_ERROR');
    }
};

/**
 * Function to send a verification email
 * @param {string} email The email address to verify
 * @returns {Promise<void>}
 */
export const sendVerificationEmail = async (email) => {
    const user = auth.currentUser;
    if (user) {
        try {
            await sendEmailVerification(user);
            Alert.alert('Verification Email Sent', `A verification email has been sent to ${email}. Please verify your email.`);
        } catch (err) {
            const errorMessage = handleFirebaseError(err);
            Alert.alert('Send Verification Email Error', errorMessage);
        }
    } else {
        throwError('User not authenticated', 'AUTH_ERROR');
    }
};

export const signup = (email, password) => {
    if (email !== '' && password !== '') {
        console.log("Registering with Email and Password");
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert('Signup success: Verify your E-mail to proceed.');
                sendEmailVerification(userCredential.user);
            })
            .catch((err) => {
                const errorMessage = handleFirebaseError(err);
                Alert.alert('Signup error', errorMessage);
            });
    } else {
        Alert.alert('Signup error', 'Email and password must not be empty');
    }
};

export const login = (email, password) => {
    if (email !== '' && password !== '') {
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
        Alert.alert('Login error', 'Email and password must not be empty');
    }
};