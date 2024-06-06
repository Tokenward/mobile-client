import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import { getDocs, deleteDoc } from 'firebase/firestore';

const saveNewItem = async (title, type, label, icon, content, selectedTag, selectedFolder, router) => {
    console.log("Saving new Item...");
    const user = auth.currentUser;
    console.log("Starting if statement...");
    if (user && title && type) {
        console.log("If statement passed");
        const userId = user.uid;

        let defaultIcon = icon;
        if (type === 'folder') {
            defaultIcon = 'folder';
        } else if (type === 'tag') {
            defaultIcon = icon || 'tag';
        }

        const newItem = { label, icon: defaultIcon, content };

        try {
            const docRef = await addDoc(collection(database, 'users', userId, type), newItem);
            if (type === 'passwordToken') {
                if (selectedTag) {
                    await updateDoc(doc(database, 'users', userId, 'tag', selectedTag.value), {
                        items: collection(database, 'users', userId, type).doc(docRef.id)
                    });
                }
                if (selectedFolder) {
                    await updateDoc(doc(database, 'users', userId, 'folder', selectedFolder.value), {
                        items: collection(database, 'users', userId, type).doc(docRef.id)
                    });
                }
            }
            console.log("Document successfully written!");
            router.navigate("../../(tabs)/vault");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
};

export const getVaultItems = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const userId = user.uid;
    const tagsSnapshot = await getDocs(collection(database, 'users', userId, 'tag'));
    const foldersSnapshot = await getDocs(collection(database, 'users', userId, 'folder'));
    const noFolderItemsSnapshot = await getDocs(collection(database, 'users', userId, 'passwordToken'));

    const tags = tagsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const folders = foldersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const noFolderItems = noFolderItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return { tags, folders, noFolderItems };
};


export const getFolderItems = async (folderId) => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');
    
    const userId = user.uid;
    const folderItemsSnapshot = await getDocs(collection(database, 'users', userId, 'folders', folderId, 'items'));

    const folderItems = folderItemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

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