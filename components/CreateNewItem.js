import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { useRouter } from "expo-router";
import InputBox from './InputBox';
import saveNewItem from '../lib/api/item';
import Dropdown from './Dropdown';
import { auth, database } from '../config/firebase';
import { getVaultItems } from '../lib/api/item';


export default function CreateNewItem({ navigation }) {
    const [type, setType] = useState('noFolderItems');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTags] = useState([]);
    const [folder, setFolders] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const router = useRouter();



    useEffect(() => {
        const fetchTagsAndFolders = async () => {
            const user = auth.currentUser;
            if (user) {
                const userId = user.uid;

                const { tagData, folderData } = await getVaultItems();
                setTags(tagData);
                setFolders(folderData);

            }
        };

        fetchTagsAndFolders();
    }, []);

    const handleSave = () => {
        saveNewItem(title, type, content, selectedTag, selectedFolder);
        router.navigate("../../(tabs)/vault")

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
                {type === 'passwordToken' && (
                    <>
                        <InputBox label="Name" value={title} onChangeText={setTitle} />
                        <InputBox label="Content" value={content} onChangeText={setContent} />
                        <Dropdown label="Select Tag" data={tag} onSelect={setSelectedTag} value={selectedTag} />
                        <Dropdown label="Select Folder" data={folder} onSelect={setSelectedFolder} value={selectedFolder} />
                    </>
                )}
                {type === 'folder' && (
                    <>
                        <InputBox label="Name" value={title} onChangeText={setTitle} />
                    </>
                )}
                {type === 'tag' && (
                    <>
                        <InputBox label="Name" value={title} onChangeText={setTitle} />
                    </>
                )}
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