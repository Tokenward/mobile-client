/**
 * Project: Tokenward Mobile-Client
 * File: /config/firebase.js
 * Description: Configuration for the Firebase authentication + database
 * Author: Mitja Kurath
 * Date: [2024-05-06]
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';
 
// firebase config
const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.apiKey,
    authDomain: Constants.expoConfig.extra.authDomain,
    projectId: Constants.expoConfig.extra.projectId,
    storageBucket: Constants.expoConfig.extra.storageBucket,
    messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
    appId: Constants.expoConfig.extra.appId,
    measurementId: Constants.expoConfig.extra.measurementId
};
 
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();