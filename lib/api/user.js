import { auth, database } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateEmail } from "firebase/auth";

/**
 * Function to fetch vault items from Firestore
 * @returns {Promise<Object>} The user's vault items
 */
export const getVaultItems = async () => {
    const user = auth.currentUser;

    if (user) {
        const userId = user.uid;

        // Fetch tags, folders, and noFolderItems from Firestore
        const tagsSnapshot = await getDocs(collection(database, 'users', userId, 'tags'));
        const foldersSnapshot = await getDocs(collection(database, 'users', userId, 'folders'));
        const noFolderItemsSnapshot = await getDocs(collection(database, 'users', userId, 'noFolderItems'));

        // Extract data from the snapshots
        const tagsData = tagsSnapshot.docs.map(doc => doc.data());
        const foldersData = foldersSnapshot.docs.map(doc => doc.data());
        const noFolderItemsData = noFolderItemsSnapshot.docs.map(doc => doc.data());

        // Combine all data into a single object
        const userData = {
            tags: tagsData,
            folders: foldersData,
            noFolderItems: noFolderItemsData
        };

        // Save data locally
        await saveDataLocally(userData);

        // Return the fetched data
        return userData;
    }
    throw new Error('User not authenticated');
};

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
            await user.updateEmail(newEmail);
            console.log('Email updated successfully');
        } catch (error) {
            console.error('Error updating email:', error);
        }
    } else {
        throw new Error('User not authenticated');
    }
};