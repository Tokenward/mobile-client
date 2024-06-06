/**
 * VaultScreen Component
 * 
 * This component fetches and displays the user's vault items including tags, folders, 
 * and items that are not in any folder. It utilizes the React hooks useState and useEffect 
 * for state management and lifecycle methods respectively. The component shows a loading 
 * indicator while the data is being fetched and displays the data once it is loaded.
 * 
 * Props:
 * - navigation: The navigation prop is used to navigate between different screens in the app.
 * 
 * State:
 * - tags: An array of tag objects fetched from the API.
 * - folders: An array of folder objects fetched from the API.
 * - noFolderItems: An array of items not assigned to any folder fetched from the API.
 * - loading: A boolean indicating whether the data is currently being fetched.
 * 
 * The component is styled using StyleSheet from 'react-native'.
 * 
 * Author:  Mitja Kurath
 * Date: 06.06.2024
 */

// React Imports
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

// Custom Component Imports
import Item from '../../../components/Item';
import { getVaultItems } from '../../../lib/api/user';

export default function VaultScreen({ navigation }) {
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [noFolderItems, setNoFolderItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {tags, folders, noFolderItems} = await getVaultItems();
                // Update state with the fetched data
                setTags(tags);
                setFolders(folders);
                setNoFolderItems(noFolderItems);
                setLoading(false); // Set loading to false after data is fetched
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

    // Render a loading indicator while data is being fetched
    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </SafeAreaView>
        );
    }

    // Render the main content once data is loaded
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                {/* Display tags */}
                <Text style={styles.sectionTitle}>TAGS</Text>
                {tags.map((tag, index) => (
                    <Item key={index} type="icon" icon={tag.icon} label={tag.label} />
                ))}

                {/* Display folders */}
                <Text style={styles.sectionTitle}>FOLDERS</Text>
                {folders.map((folder, index) => (
                    <Item key={index} type="folder" label={folder.label} />
                ))}

                {/* Display items with no folder */}
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