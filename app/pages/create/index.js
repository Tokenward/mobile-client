import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Stack, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import useGoBack from "../../../lib/hooks/useGoBack";
import { getVaultItems, saveNewItem } from "../../../lib/api/item";
import Dropdown from '../../../components/essential/Dropdown';
import ItemForm from "../../../components/ItemForm";
import CustomButton from "../../../components/essential/CustomButton";
import { auth } from "../../../config/firebase";
import useThemeContext from "../../../lib/hooks/useThemeContext";

export default function CreatePage() {
  const colors = useThemeContext();
  const router = useRouter();
  const goBack = useGoBack();

  const [type, setType] = useState('passwordToken');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [folders, setFolders] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleSave = async () => {
    try {
        let newSelectedTagId = selectedTag?.value || null;
        let newSelectedFolderId = selectedFolder?.value || null;

        if (type === 'tag' && !selectedTag) {
            const { selectedTagId: newTagId } = await saveNewItem(title, type, content);
            newSelectedTagId = newTagId;
        } else if (type === 'folder' && !selectedFolder) {
            const { selectedFolderId: newFolderId } = await saveNewItem(title, type, content);
            newSelectedFolderId = newFolderId;
        } else {
            await saveNewItem(title, type, content, newSelectedTagId, newSelectedFolderId);
        }

        goBack();
    } catch (error) {
        console.error("Error saving item:", error);
    }
};

  useEffect(() => {
    const fetchTagsAndFolders = async () => {
      const user = auth.currentUser;
      if (user) {
        const { tags, folders } = await getVaultItems();
        setTags(tags.map(tag => ({ label: tag.item.title, value: tag.id })));
        setFolders(folders.map(folder => ({ label: folder.item.title, value: folder.id })));
        console.log("Tag Data: ", tags)
        console.log("Folders Data: ", folders)
      }
    };
    
    fetchTagsAndFolders();
  }, []);

  const itemTypes = [
    { label: 'Tag', value: 'tag' },
    { label: 'Folder', value: 'folder' },
    { label: 'Password/Token', value: 'password' },
  ];

  try {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
        <StatusBar backgroundColor={colors.background} barStyle={colors.barStyle} />
        <Stack.Screen
          options={{
            title: "Create",
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.surface,
            },
            headerTintColor: colors.onSurface,
            headerLeft: () => (
              <TouchableOpacity onPress={goBack} style={{ marginLeft: 16 }}>
                <Ionicons name="arrow-back-outline" size={24} color={colors.onSurface} />
              </TouchableOpacity>
            ),
          }}
        />
        <View style={styles.container}>
          <Dropdown
            label="Select type"
            data={itemTypes}
            onSelect={(item) => setType(item.value)}
            value={itemTypes.find(item => item.value === type)}
          />
          <ItemForm
            type={type}
            title={title}
            content={content}
            tags={tags}
            folders={folders}
            setTitle={setTitle}
            setContent={setContent}
            setSelectedTag={setSelectedTag}
            setSelectedFolder={setSelectedFolder}
            selectedTag={selectedTag}
            selectedFolder={selectedFolder}
          />
          <CustomButton onPress={handleSave}>Save</CustomButton>
        </View>
      </SafeAreaView>
    );
  } catch (error) {
    console.error("Error rendering CreatePage component:", error);
    return null;
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  container: {
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 48,
    fontWeight: "bold",
    fontFamily: "Roboto",
    marginTop: 16,
  },
});