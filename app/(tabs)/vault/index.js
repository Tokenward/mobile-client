import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Item from '../../../components/Item';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth, database } from '../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function VaultScreen({ navigation }) {
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [noFolderItems, setNoFolderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const user = auth.currentUser;

            if (user) {
                const userId = user.uid;
                const tagsSnapshot = await getDocs(collection(database, 'users', userId, 'tags'));
                const foldersSnapshot = await getDocs(collection(database, 'users', userId, 'folders'));
                const noFolderItemsSnapshot = await getDocs(collection(database, 'users', userId, 'noFolderItems'));

                const tagsData = tagsSnapshot.docs.map(doc => doc.data());
                const foldersData = foldersSnapshot.docs.map(doc => doc.data());
                const noFolderItemsData = noFolderItemsSnapshot.docs.map(doc => doc.data());

                setTags(tagsData);
                setFolders(foldersData);
                setNoFolderItems(noFolderItemsData);
                setLoading(false);
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.sectionTitle}>TAGS</Text>
                {tags.map((tag, index) => (
                    <Item key={index} type="icon" icon={tag.icon} label={tag.label} />
                ))}

                <Text style={styles.sectionTitle}>FOLDERS</Text>
                {folders.map((folder, index) => (
                    <Item key={index} type="folder" label={folder.label} />
                ))}

                <Text style={styles.sectionTitle}>NO FOLDER</Text>
                {noFolderItems.map((item, index) => ( 
                    <Item key={index} type="list" label={item.label} />
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
    header: {
        padding: 16,
        backgroundColor: '#444',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
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