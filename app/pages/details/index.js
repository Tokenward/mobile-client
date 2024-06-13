import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen({ route }) {
    const { icon, title, type, name, content } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            {name && <Text style={styles.name}>Name: {name}</Text>}
            {content && <Text style={styles.content}>Content: {content}</Text>}
        </View>
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
