import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import { useRouter } from 'expo-router';

const saveNewItem = async (title, type, icon, content, selectedTag, selectedFolder) => {
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
            if (selectedTag) {
                await updateDoc(doc(database, 'users', userId, 'tag', selectedTag.value), {
                    items: doc(database, 'users', userId, type, docRef.id)
                });
            }
            if (selectedFolder) {
                await updateDoc(doc(database, 'users', userId, 'folder', selectedFolder.value), {
                    items: doc(database, 'users', userId, type, docRef.id)
                });
            }
        }

        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
};

export const getVaultItems = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
  
    const userId = user.uid;
    const tagSnapshot = await getDocs(collection(database, 'users', userId, 'tag'));
    const folderSnapshot = await getDocs(collection(database, 'users', userId, 'folder'));
    const passwordTokensSnapshot = await getDocs(collection(database, 'users', userId, 'passwordToken'));
  
    const tags = tagSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const folders = folderSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const noFolderPasswordsTokens = passwordTokensSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
    const folderData = folders.map(folder => ({ label: folder.title || '' })); 
    const tagData = tags.map(tag => ({ label: tag.title || '' })); 

    return { tags, folders, noFolderPasswordsTokens, folderData, tagData };
};



export const getFolderItems = async (folderId) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const userId = user.uid;
    const folderItemSnapshot = await getDocs(collection(database, 'users', userId, 'folders', folderId, 'items'));

    const folderItems = folderItemSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return folderItems;
};

export const deleteItem = async (itemId, itemType) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const userId = user.uid;
    try {
        await deleteDoc(doc(database, 'users', userId, itemType, itemId));
        console.log(`Document with ID ${itemId} successfully deleted!`);
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
};

export default saveNewItem;
