import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Item from '../../../components/Item';
import { getVaultItems, deleteItem } from '../../../lib/api/item';

export default function VaultScreen({ navigation }) {
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [noFolderItems, setNoFolderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { tags, folders, noFolderItems } = await getVaultItems();
                console.log("Fetched Tags:", tags);
                console.log("Fetched Folders:", folders);
                console.log("Fetched No Folder Items:", noFolderItems);
                setTags(tags);
                setFolders(folders);
                setNoFolderItems(noFolderItems);
                setLoading(false);
            } catch (error) {
                console.error("Error while fetching user data: \n" + error);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (itemId, itemType) => {
        try {
            await deleteItem(itemId, itemType);
            setTags(tags.filter(tag => tag.id !== itemId));
            setFolders(folders.filter(folder => folder.id !== itemId));
            setNoFolderItems(noFolderItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error deleting item: ", error);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>TAGS</Text>
                {tags.map((tag) => (
                    <Item key={tag.id} type="icon" icon={tag.icon} label={tag.label} onDelete={() => handleDelete(tag.id, 'tag')} />
                ))}
                <Text style={styles.sectionTitle}>FOLDERS</Text>
                {folders.map((folder) => (
                    <Item key={folder.id} type="folder" label={folder.label} onDelete={() => handleDelete(folder.id, 'folder')} />
                ))}
                <Text style={styles.sectionTitle}>NO FOLDER</Text>
                {noFolderItems.map((item) => (
                    <Item key={item.id} type="list" label={item.label} name={item.title} content={item.content} onDelete={() => handleDelete(item.id, 'passwordToken')} />
                ))}
            </ScrollView>
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
    sectionTitle: {
        fontSize: 18,
        color: '#bbb',
        marginVertical: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
