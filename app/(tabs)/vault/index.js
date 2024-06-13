import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import Item from '../../../components/Item';
import { getVaultItems, deleteItem } from '../../../lib/api/item';

export default function VaultScreen({ navigation }) {
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [noFolderItems, setNoFolderItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getVaultItems();
                console.log("Fetched Data:", data);
                setTags(data.tags);
                setFolders(data.folders);
                setNoFolderItems(data.noFolderPasswordsTokens);
                setLoading(false);
            } catch (error) {
                console.error("Error while fetching user data: \n" + error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (itemId, itemType) => {
        try {
            await deleteItem(itemId, itemType);
            if (itemType === 'tag') {
                setTags(tags.filter(tag => tag.id !== itemId));
            } else if (itemType === 'folder') {
                setFolders(folders.filter(folder => folder.id !== itemId));
            } else if (itemType === 'passwordToken') {
                setNoFolderItems(noFolderItems.filter(item => item.id !== itemId));
            }
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

    if (error) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.errorText}>Error: {error.message}</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>Tags</Text>
                {tags.map(tag => (
                    <Item
                        key={tag.id}
                        icon={tag.icon}
                        title={tag.title}
                        type="icon"
                        name={tag.name}
                        content={tag.content}
                    />
                ))}

                <Text style={styles.sectionTitle}>Folders</Text>
                {folders.map(folder => (
                    <Item
                        key={folder.id}
                        icon={folder.icon}
                        title={folder.title}
                        type="folder"
                        name={folder.name}
                        content={folder.content}
                    />
                ))}

                <Text style={styles.sectionTitle}>Unsorted Passwords/Tokens</Text>
                {noFolderItems.map(item => (
                    <Item
                        key={item.id}
                        icon={item.icon}
                        title={item.title}
                        type="list"
                        name={item.name}
                        content={item.content}
                    />
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
    errorText: {
        color: 'red',
    },
});
