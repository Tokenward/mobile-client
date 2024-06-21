import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useThemeContext from '../lib/hooks/useThemeContext';
import { Link } from 'expo-router';

export default function Item({ icon, title, type, name, content, id }) {
  const colors = useThemeContext();

  console.log('Rendering Item:', { icon, title, type, name, content });

  return (
    <Link
      href={`../details?name=${encodeURIComponent(title, type, id)}`}
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.onSurface }]}
    >
      {type === 'tag' && <MaterialIcons name="tag" size={24} color={colors.icon} />}
      {type === 'folder' && <MaterialIcons name="folder" size={24} color={colors.icon} />}
      {type === 'password' && <MaterialIcons name="key" size={24} color={colors.icon} />}
      <View style={styles.textContainer}>
        <Text style={[styles.label, { color: colors.onSurface }]}>{title}</Text>
        {name && <Text style={[styles.name, { color: colors.onSurface }]}>{name}</Text>}
        {content && <Text style={[styles.content, { color: colors.onSurface }]}>{content}</Text>}
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    marginTop: 4,
  },
  content: {
    fontSize: 14,
    marginTop: 2,
  },
});
