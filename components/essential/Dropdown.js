import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import useThemeContext from '../../lib/hooks/useThemeContext';

export default function Dropdown({ label, data, onSelect, value, multiple }) {
  const [showOptions, setShowOptions] = useState(false);
  const colors = useThemeContext();

  const handleSelect = (item) => {
    if (multiple) {
      const newValue = value.includes(item)
        ? value.filter((v) => v.value !== item.value)
        : [...value, item];
      onSelect(newValue);
    } else {
      onSelect(item);
      setShowOptions(false);
    }
  };

  return (
    <View style={styles.dropdown}>
      <TouchableOpacity onPress={() => setShowOptions(!showOptions)} style={[styles.dropdownButton, { backgroundColor: colors.surface, borderColor: colors.onSurface }]}>
        <Text style={[styles.dropdownButtonText, { color: colors.onSurface }]}>
          {multiple
            ? value.map((v) => v.label).join(', ') || label
            : value ? value.label : label}
        </Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={[styles.dropdownOptions, { backgroundColor: colors.surface, borderColor: colors.onSurface }]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.dropdownOption}>
                <Text style={[styles.dropdownOptionText, { color: colors.onSurface }]}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 20,
  },
  dropdownButton: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 4,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 5,
    maxHeight: 150,
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownOptionText: {
    fontSize: 16,
  },
});