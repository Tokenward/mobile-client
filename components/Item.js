import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Item({ icon, label, type }) {
    return (
        <View style={styles.container}>
            {type === 'icon' && <Image source={icon} style={styles.icon} />}
            {type === 'folder' && <MaterialIcons name="folder" size={24} color="#fff" />}
            {type === 'list' && <MaterialIcons name="list" size={24} color="#fff" />}
            <Text style={styles.label}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#fff',
        marginLeft: 10,
    },
});