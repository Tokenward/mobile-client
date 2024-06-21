import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import useThemeContext from '../lib/hooks/useThemeContext';

export default function Item({ icon, title, type, name, content, id }) {
  const colors = useThemeContext();

  return (
    <Link
      href={`../details?name=${encodeURIComponent(title, type, id)}`}
      style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.onSurface }]}
    >
      <View style={styles.iconContainer}>
        {type === 'tag' && <MaterialIcons name="local-offer" size={24} color={colors.primary} />}
        {type === 'folder' && <MaterialIcons name="folder" size={24} color={colors.primary} />}
        {type === 'password' && <MaterialIcons name="vpn-key" size={24} color={colors.primary} />}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {name && <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{name}</Text>}
        {content && <Text style={[styles.content, { color: colors.textSecondary }]}>{content}</Text>}
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    backgroundColor: '#f0f0f0',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});
