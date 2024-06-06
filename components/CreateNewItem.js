import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { useRouter } from "expo-router";
import InputBox from './InputBox';
import saveNewItem from '../lib/api/item';
import Dropdown from './Dropdown';
import { auth, database } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function CreateNewItem({ navigation }) {
    const [type, setType] = useState('noFolderItems');
    const [label, setLabel] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [icon, setIcon] = useState('');
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTagsAndFolders = async () => {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;
                const tagsSnapshot = await getDocs(collection(database, 'users', userId, 'tags'));
                const foldersSnapshot = await getDocs(collection(database, 'users', userId, 'folders'));
                setTags(tagsSnapshot.docs.map(doc => ({ label: doc.data().label, value: doc.id })));
                setFolders(foldersSnapshot.docs.map(doc => ({ label: doc.data().label, value: doc.id })));
            }
        };

        fetchTagsAndFolders();
    }, []);

    const handleSave = () => {
        saveNewItem(title, type, label, icon, content, selectedTag, selectedFolder, router);
    };

    const itemTypes = [
        { label: 'Tag', value: 'tag' },
        { label: 'Folder', value: 'folder' },
        { label: 'Password/Token', value: 'passwordToken' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Password/Token</Text>
                <Dropdown label="Select item type" data={itemTypes} onSelect={(item) => setType(item.value)} value={itemTypes.find(item => item.value === type)} />
                <InputBox label="Name" value={title} onChangeText={setTitle} />
                {type === 'passwordToken' && (
                    <>
                        <Dropdown label="Select Tag" data={tags} onSelect={setSelectedTag} value={selectedTag} />
                        <Dropdown label="Select Folder" data={folders} onSelect={setSelectedFolder} value={selectedFolder} />
                    </>
                )}
                <InputBox label="Content" value={content} onChangeText={setContent} />
                <CustomButton onPress={handleSave}>Save</CustomButton>
                <Button title="Cancel" onPress={() => router.navigate("../../(tabs)/vault")} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#333',
    },
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
});