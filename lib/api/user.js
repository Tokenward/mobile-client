/**
 * Project: Tokenward Mobile-Client
 * File: /lib/api/user.js
 * Description: API functions for user authentication and data management.
 * Author: Mitja Kurath
 * Date: [2024-06-20]
 */

import { auth } from "../../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, updateEmail } from "firebase/auth";
import { Alert } from "react-native";
import { router } from "expo-router";
import { throwError, handleFirebaseError } from "./util/error";

/**
 * Saves user data locally using AsyncStorage
 * @param {Object} data - The user data to save
 * @returns {Promise<void>}
 */
export const saveDataLocally = async (data) => {
    try {
        await AsyncStorage.setItem('@userVaultData', JSON.stringify(data));
        console.log('Data saved locally:', data);
    } catch (error) {
        console.error('Error saving data locally:', error);
    }
};

/**
 * Retrieves user data from local storage
 * @returns {Promise<Object|null>} - The user data from local storage
 */
export const getLocalData = async () => {
    try {
        const jsonData = await AsyncStorage.getItem('@userVaultData');
        console.log('Retrieved data from local storage:', jsonData);
        return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error('Error retrieving local data:', error);
        return null;
    }
};

/**
 * Changes the user's email
 * @param {string} newEmail - The new email address to set
 * @returns {Promise<void>}
 */
export const changeUserEmail = async (newEmail) => {
    const user = auth.currentUser;

    if (user) {
        if (!user.emailVerified) {
            Alert.alert('Email not verified', 'Please verify your current email before changing to a new email.');
            return;
        }

        try {
            await updateEmail(user, newEmail);
            await sendVerificationEmail(newEmail);
            Alert.alert('Verification link sent', 'Please check your new email to verify.');
        } catch (err) {
            const errorMessage = handleFirebaseError(err);
            Alert.alert('Email verification error', errorMessage);
        }
    } else {
        throwError('User not authenticated', 'AUTH_ERROR');
    }
};

/**
 * Sends a verification email
 * @param {string} email - The email address to verify
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

/**
 * Signs up a new user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<void>}
 */
export const signup = async (email, password) => {
    if (email && password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Signup success: Verify your email to proceed.');
            await sendEmailVerification(userCredential.user);
        } catch (err) {
            const errorMessage = handleFirebaseError(err);
            Alert.alert('Signup error', errorMessage);
        }
    } else {
        Alert.alert('Signup error', 'Email and password must not be empty');
    }
};

/**
 * Logs in a user with email and password
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<void>}
 */
export const login = async (email, password) => {
    if (email && password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/vault');
        } catch (err) {
            const errorMessage = handleFirebaseError(err);
            Alert.alert('Login error', errorMessage);
        }
    } else {
        Alert.alert('Login error', 'Email and password must not be empty');
    }
};
