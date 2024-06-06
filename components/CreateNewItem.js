import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Item from './Item';
import { getVaultItems } from '../lib/api/item';

export default function VaultScreen({ navigation }) {
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [noFolderItems, setNoFolderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { tags, folders, noFolderItems } = await getVaultItems();
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

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </SafeAreaView>
        );
    }

    const handleFolderPress = (folder) => {
        navigation.navigate('FolderDetails', { folderId: folder.id, folderLabel: folder.label });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>TAGS</Text>
                {tags.map((tag, index) => (
                    <Item key={index} type="icon" icon={tag.icon} label={tag.label} />
                ))}

                <Text style={styles.sectionTitle}>FOLDERS</Text>
                {folders.map((folder, index) => (
                    <Item key={index} type="folder" label={folder.label} onPress={() => handleFolderPress(folder)} />
                ))}

                <Text style={styles.sectionTitle}>NO FOLDER</Text>
                {noFolderItems.map((item, index) => (
                    <Item key={index} type="list" label={item.label} name={item.title} content={item.content} />
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
