import React, { useState } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { useRouter } from "expo-router";
import InputBox from './InputBox';
import saveNewItem from '../lib/api/item';

export default function CreateNewItem({ navigation }) {
    const [type, setType] = useState('noFolderItems');
    const [label, setLabel] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [icon, setIcon] = useState('');
    const router = useRouter();

    const handleSave = () => {
        saveNewItem(title, type, label, icon, content, router);
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
