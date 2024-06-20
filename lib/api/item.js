/**
 * Project: Tokenward Mobile-Client
 * File: /lib/api/item.js
 * Description: API functions for managing items (Password/Token, Folder, Tag).
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';

/**
 * Saves a new item to the user's vault
 * @param {string} title - The title of the item
 * @param {string} type - The type of the item (e.g., folder, tag, passwordToken)
 * @param {string} icon - The icon of the item
 * @param {string} content - The content of the item
 * @param {Object} selectedTag - The selected tag for the item
 * @param {Object} selectedFolder - The selected folder for the item
 * @returns {Promise<void>}
 */
export async function saveNewItem(title, type, icon, content, selectedTag, selectedFolder) {
    console.log("Saving new Item...");
    const user = auth.currentUser;

    if (!user || !title || !type) {
        console.error("User not authenticated or missing required parameters");
        return;
    }

    const userId = user.uid;
    let defaultIcon = icon;

    if (type === 'folder') {
        defaultIcon = 'folder';
    } else if (type === 'tag') {
        defaultIcon = icon || 'tag';
    }

    const newItem = { title, type, icon: defaultIcon, content };

    try {
        const docRef = await addDoc(collection(database, 'users', userId, type), newItem);

        if (type === 'passwordToken') {
            const updateItems = async (itemType, selectedItemId) => {
                await updateDoc(doc(database, 'users', userId, itemType, selectedItemId), {
                    items: doc(database, 'users', userId, type, docRef.id)
                });
            };
            if (selectedTag) {
                await updateItems('tag', selectedTag.value);
            }
            if (selectedFolder) {
                await updateItems('folder', selectedFolder.value);
            }
        }

        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

/**
 * Retrieves vault items for the current user
 * @returns {Promise<Object>} - The user's vault items
 */
export const getVaultItems = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userId = user.uid;
    const [tagSnapshot, folderSnapshot, passwordTokensSnapshot] = await Promise.all([
        getDocs(collection(database, 'users', userId, 'tag')),
        getDocs(collection(database, 'users', userId, 'folder')),
        getDocs(collection(database, 'users', userId, 'passwordToken')),
    ]);

    const tags = tagSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const folders = folderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const noFolderPasswordsTokens = passwordTokensSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const folderData = folders.map(folder => ({ label: folder.title || '' }));
    const tagData = tags.map(tag => ({ label: tag.title || '' }));

    return { tags, folders, noFolderPasswordsTokens, folderData, tagData };
};

/**
 * Retrieves items within a specific folder
 * @param {string} folderId - The ID of the folder
 * @returns {Promise<Array>} - The items within the folder
 */
export const getFolderItems = async (folderId) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userId = user.uid;
    const folderItemSnapshot = await getDocs(collection(database, 'users', userId, 'folders', folderId, 'items'));

    return folderItemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

/**
 * Deletes an item from the user's vault
 * @param {string} itemId - The ID of the item to delete
 * @param {string} itemType - The type of the item (e.g., folder, tag, passwordToken)
 * @returns {Promise<void>}
 */
export async function deleteItem(itemId, itemType) {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userId = user.uid;
    try {
        await deleteDoc(doc(database, 'users', userId, itemType, itemId));
        console.log(`Document with ID ${itemId} successfully deleted!`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
}
