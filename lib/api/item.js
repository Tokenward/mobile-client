import { collection, addDoc } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';

const saveNewItem = async (title, type, label, icon, content, router) => {
    console.log("Saving new Item...");
    const user = auth.currentUser;
    console.log("Starting if statement...");
    if (user && title && type) {
        console.log("If statement passed");
        const userId = user.uid;
        const newItem = { label, icon, content };

        try {
            await addDoc(collection(database, 'users', userId, type), newItem);
            console.log("Document successfully written!");
            router.navigate("../../(tabs)/vault");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }
};

export default saveNewItem;
