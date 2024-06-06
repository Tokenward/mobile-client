import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { auth, database } from '../config/firebase';
import CustomButton from './CustomButton';
import { useRouter } from "expo-router";
import InputBox from './InputBox';
import { collection, addDoc } from 'firebase/firestore';

export default function CreateNewItem({ navigation }) {
    const [type, setType] = useState('password');
    const [label, setLabel] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [icon, setIcon] = useState('');
    const router = useRouter();

    const handleSave = async () => {
        console.log("Saving new Item...");
        const user = auth.currentUser;
        console.log("Starting if statement...");
        if (user && title && type) {
            console.log("If statement passed");
            const userId = user.uid;
            const newItem = { label, icon, content };

            try {
                await addDoc(collection(database, 'users', userId, type), newItem);
                console.log("Document successfully written!");
                router.navigate("../../(tabs)/vault");
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Password/Token</Text>
                <InputBox label="Name" value={title} onChangeText={setTitle} />
                <InputBox label="Content" value={content} onChangeText={setContent} />
                <CustomButton onPress={handleSave}>Save</CustomButton>
                <Button title="Cancel" onPress={() => router.navigate("../../(tabs)/vault")} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#333',
    },
    container: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
});
