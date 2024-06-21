import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebase';

export async function saveNewItem(title, type, content, selectedTagId = null, selectedFolderId = null) {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    const userId = user.uid;
    let defaultIcon = '';

    if (type === 'folder') {
        defaultIcon = 'folder';
    } else if (type === 'tag') {
        defaultIcon = 'tag';
    }

    const newItem = {
        title: title,
        type: type,
        icon: defaultIcon,
        content: content,
        selectedTagId: selectedTagId,
        selectedFolderId: selectedFolderId,
        userId: userId,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    try {
        const docRef = await addDoc(collection(firestore, "users", userId, type), {
            item: newItem
        });

        if (type === 'tag' && selectedTagId === null) {
            selectedTagId = docRef.id;
        } else if (type === 'folder' && selectedFolderId === null) {
            selectedFolderId = docRef.id;
        }

        return { ...newItem, selectedTagId, selectedFolderId };
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error('Failed to add document');
    }
}

export const getVaultItems = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userId = user.uid;
    const [tagSnapshot, folderSnapshot, passwordTokensSnapshot] = await Promise.all([
        getDocs(collection(firestore, 'users', userId, 'tag')),
        getDocs(collection(firestore, 'users', userId, 'folder')),
        getDocs(collection(firestore, 'users', userId, 'password')),
    ]);

    const tags = tagSnapshot.docs.map(doc => ({ id: doc.id, item: doc.data().item }));
    const folders = folderSnapshot.docs.map(doc => ({ id: doc.id, item: doc.data().item }));
    const noFolderPasswords = passwordTokensSnapshot.docs.map(doc => ({ id: doc.id, password: doc.data().item }));

    return { tags, folders, noFolderPasswords };
};

export const getItemById = async (type, id) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error('User not authenticated');
    }

    const userId = user.uid;

    try {
        const docRef = doc(firestore, 'users', userId, type, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, item: docSnapshot.data().item };
        } else {
            throw new Error('Document does not exist');
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw new Error('Failed to get document');
    }
};
