import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function({ label, data, onSelect, value, multiple }){
    const [showOptions, setShowOptions] = useState(false);

    const handleSelect = (item) => {
        if (multiple) {
            const newValue = value.includes(item)
                ? value.filter((v) => v !== item)
                : [...value, item];
            onSelect(newValue);
        } else {
            onSelect(item);
            setShowOptions(false);
        }
    };

    return (
        <View style={styles.dropdown}>
            <TouchableOpacity onPress={() => setShowOptions(!showOptions)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>
                    {multiple
                        ? value.map((v) => v.label).join(', ') || label
                        : value ? value.label : label}
                </Text>
            </TouchableOpacity>
            {showOptions && (
                <View style={styles.dropdownOptions}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.value}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.dropdownOption}>
                                <Text style={styles.dropdownOptionText}>{item.label}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        marginBottom: 20,
    },
    dropdownButton: {
        backgroundColor: '#444',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
    },
    dropdownButtonText: {
        color: 'white',
        fontSize: 16,
    },
    dropdownOptions: {
        backgroundColor: '#444',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        marginTop: 5,
        maxHeight: 150,
    },
    dropdownOption: {
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    dropdownOptionText: {
        color: 'white',
        fontSize: 16,
    },
});