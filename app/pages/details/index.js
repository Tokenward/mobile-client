import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

export default function DetailScreen() {
    const route = useRoute();
    const { id, icon, title, type, name, content } = route.params;
    const [item, setItem] = useState({});

    useEffect(() => {
        // You can fetch more detailed data using the item ID if necessary.
        // Example: fetchItemDetails(id).then(data => setItem(data));
        setItem({ id, icon, title, type, name, content });
    }, [id]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            {item.name && <Text style={styles.name}>Name: {item.name}</Text>}
            {item.content && <Text style={styles.content}>Content: {item.content}</Text>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#333',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    name: {
        fontSize: 18,
        color: '#bbb',
    },
    content: {
        fontSize: 16,
        color: '#aaa',
    },
});
