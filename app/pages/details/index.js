/**
 * Project: Tokenward Mobile-Client
 * File: /components/DetailScreen.js
 * Description: Screen to display and edit the details of an item.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Alert, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import {deleteItem} from "../../../lib/api/item"
import { auth, database } from '../../../config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import InputBox from '../../../components/InputBox';
import CustomButton from '../../../components/CustomButton';

export default function DetailScreen() {
    const route = useRoute();
    const navigation = useNavigation();
    const { id, icon, title, type, name, content } = route.params;
    const [item, setItem] = useState({ id, icon, title, type, name, content });
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);

    useEffect(() => {
        setItem({ id, icon, title, type, name, content });
        console.log(item);
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteItem(id, type);
            navigation.goBack();
        } catch (error) {
            console.error("Error deleting item:", error);
            Alert.alert('Error', 'An error occurred while deleting the item');
        }
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (!user) {
            Alert.alert('Error', 'User not authenticated');
            return;
        }

        const userId = user.uid;
        const itemDoc = doc(database, 'users', userId, type, id);
        try {
            const updatedData = { title: newTitle };
            if (type === 'passwordToken') {
                updatedData.content = newContent;
            }
            await updateDoc(itemDoc, updatedData);
            Alert.alert('Success', 'Item updated successfully');
            setItem({ ...item, title: newTitle, content: newContent });
        } catch (error) {
            console.error("Error updating item:", error);
            Alert.alert('Error', 'An error occurred while updating the item');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
            
            <InputBox
                label="Enter new title"
                value={newTitle}
                onChangeText={setNewTitle}
            />
            {item.type === 'list' && (
                <InputBox
                    value={newContent}
                    onChangeText={setNewContent}
                    label="Enter new content"
                />
            )}
            <Button title="Save Changes" onPress={handleSave} />
            <Button title="Delete Item" onPress={handleDelete} color="red" />
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
});