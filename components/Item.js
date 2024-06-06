import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Item({ icon, label, type, name, content, onDelete }) {
    return (
        <View style={styles.container}>
            {type === 'icon' && icon && <Image source={{ uri: icon }} style={styles.icon} />}
            {type === 'folder' && <MaterialIcons name="folder" size={24} color="#fff" />}
            {type === 'list' && <MaterialIcons name="list" size={24} color="#fff" />}
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                {name && <Text style={styles.name}>{name}</Text>}
                {content && <Text style={styles.content}>{content}</Text>}
            </View>
            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={24} color="#ff0000" style={styles.deleteIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#444',
        marginVertical: 8,
        borderRadius: 4,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    label: {
        fontSize: 18,
        color: '#fff',
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        color: '#bbb',
        marginTop: 4,
    },
    content: {
        fontSize: 14,
        color: '#aaa',
        marginTop: 2,
    },
    deleteIcon: {
        marginLeft: 10,
    },
});
