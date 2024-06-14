/**
 * Project: Tokenward Mobile-Client
 * File: /components/CreateNewItemScreen.js
 * Description: Component for creating a new item (Password/Token, Folder, Tag).
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

// React/React-Native Imports
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

// Expo Imports
import { useRouter } from "expo-router";

// Firebase Imports
import { auth } from '../../config/firebase';

// Custom Component Imports
import CustomButton from '../CustomButton';
import Dropdown from '../Dropdown';
import ItemForm from './ItemForm';

// Api Imports
import { getVaultItems} from '../../lib/api/item';
import saveNewItem from '../../lib/api/item';

export default function CreateNewItemScreen() {
    const [type, setType] = useState('noFolderItems');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchTagsAndFolders = async () => {
            const user = auth.currentUser;
            if (user) {
                const { tagData, folderData } = await getVaultItems();
                setTags(tagData);
                setFolders(folderData);
            }
        };

        fetchTagsAndFolders();
    }, []);

    const handleSave = () => {
        saveNewItem(title, type, content, selectedTag, selectedFolder);
        router.navigate("../../(tabs)/vault");
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
                <Dropdown
                    label="Select item type"
                    data={itemTypes}
                    onSelect={(item) => setType(item.value)}
                    value={itemTypes.find(item => item.value === type)}
                />
                <ItemForm
                    type={type}
                    title={title}
                    content={content}
                    tags={tags}
                    folders={folders}
                    setTitle={setTitle}
                    setContent={setContent}
                    setSelectedTag={setSelectedTag}
                    setSelectedFolder={setSelectedFolder}
                    selectedTag={selectedTag}
                    selectedFolder={selectedFolder}
                />
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