import { auth, database } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateEmail } from "firebase/auth";

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
        try {
            await updateEmail(user, newEmail);
            console.log('Email updated successfully');
        } catch (error) {
            console.error('Error updating email:', error);
        }
    } else {
        throw new Error('User not authenticated');
    }
};