import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getVaultItems } from '../../../../lib/api/item';
import Item from '../../../../components/Item';
import useThemeContext from '../../../../lib/hooks/useThemeContext';
import { Tabs } from 'expo-router';

export default function VaultScreen() {
    const colors = useThemeContext();
    const [tags, setTags] = useState([]);
    const [folders, setFolders] = useState([]);
    const [noFolderPasswords, setNoFolderPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getVaultItems();
                console.log("Fetched Data:", data);
                setTags(data.tags);
                setFolders(data.folders);
                setNoFolderPasswords(data.noFolderPasswords);
                setLoading(false);
            } catch (error) {
                console.error("Error while fetching user data: \n" + error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.onBackground} />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
                <View style={styles.loadingContainer}>
                    <Text style={[styles.errorText, { color: colors.error }]}>{`Error: ${error.message}`}</Text>
                </View>
            </SafeAreaView>
        );
    }

    

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={[styles.sectionTitle, { color: colors.onBackground }]}>Tags</Text>
                {tags.map(tag => (
                    <Item
                        key={tag.id}
                        icon={tag.item.icon}
                        title={tag.item.title}
                        type="tag"
                        name={tag.item.name}
                        content={tag.item.content}
                    />
                ))}
                <Text style={[styles.sectionTitle, { color: colors.onBackground }]}>Folders</Text>
                {folders.map(folder => (
                    <Item
                        key={folder.id}
                        icon={folder.item.icon}
                        title={folder.item.title}
                        type="folder"
                        name={folder.item.name}
                        content={folder.item.content}
                    />
                ))}
                <Text style={[styles.sectionTitle, { color: colors.onBackground }]}>Unsorted Passwords/Tokens</Text>
                {noFolderPasswords.map(password => (
                    <Item
                        key={password.id}
                        icon={password.password.icon}
                        title={password.password.title}
                        type="password"
                        name={password.password.name}
                        content={password.password.content}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
    },
});