import { auth, database } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";

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

        // Return the fetched data
        return {
            tags: tagsData,
            folders: foldersData,
            noFolderItems: noFolderItemsData
        };
    }
    throw new Error('User not authenticated');
};