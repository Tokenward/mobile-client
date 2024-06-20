import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';


export async function saveNewItem(title, type, icon, content, selectedTagId = null, selectedFolderId = null) {
    const user = auth.currentUser;

    const userId =user.uid;
    let defaultIcon = icon;

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
    }

    try {
        const docRef = await addDoc(collection(database, "users", userId, type), {
          item: newItem,    
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

export const getVaultItems = async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('User not authenticated');

    const userId = user.uid;
    const [tagSnapshot, folderSnapshot, passwordTokensSnapshot] = await Promise.all([
        getDocs(collection(database, 'users', userId, 'tag')),
        getDocs(collection(database, 'users', userId, 'folder')),
        getDocs(collection(database, 'users', userId, 'password')),
    ]);

    const tags = tagSnapshot.docs.map(doc => ({ id: doc.id, item: doc.data().item }));
    const folders = folderSnapshot.docs.map(doc => ({ id: doc.id, item: doc.data().item }));
    const noFolderPasswords = passwordTokensSnapshot.docs.map(doc => ({ id: doc.id, password: doc.data().item }));

    return { tags, folders, noFolderPasswords };
};