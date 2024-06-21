import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator, Clipboard } from 'react-native';
import useGoBack from '../../../lib/hooks/useGoBack';
import CustomButton from '../../../components/essential/CustomButton';
import { useLocalSearchParams } from 'expo-router';
import useThemeContext from '../../../lib/hooks/useThemeContext';
import { getVaultItems } from '../../../lib/api/item';
import Item from '../../../components/Item';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Alert } from 'react-native';


export default function detailScreen() {
  const params = useLocalSearchParams();
  const goBack = useGoBack();
  const colors = useThemeContext();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { type, id, name, content } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { tags, folders, noFolderPasswords } = await getVaultItems();
        let linkedItems = [];

        if (type === 'tag') {
          linkedItems = noFolderPasswords.filter(item => item.password.selectedTagId === id);
        } else if (type === 'folder') {
          linkedItems = noFolderPasswords.filter(item => item.password.selectedFolderId === id);
        }

        setItems(linkedItems);
        setLoading(false);
      } catch (error) {
        console.error("Error while fetching user data: \n" + error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, type]);

  const copyToClipboard = () => {
    Clipboard.setString(content);
    Alert.alert("Copied to Clipboard", `The text "${content}" has been copied to your clipboard.`);
  };
  

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>{`Error: ${error.message}`}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.headerText, { color: colors.text }]}>{name}</Text>
      <Text>{content}</Text>

      {type === 'password' && 
      
      <View style={{width: 40}}>
        <CustomButton onPress={copyToClipboard}>
        <MaterialIcons name="content-copy" size={24} color={"white"} />

      </CustomButton>
        </View>}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {items.map(item => (
          <Item
            key={item.id}
            icon={item.password.icon}
            title={item.password.title}
            type="password"
            name={item.password.name}
            content={item.password.content}
            id={item.id}
          />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton onPress={goBack}>
          <Text>Go Back</Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 45,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '70%',
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
  scrollContainer: {
  },
});
