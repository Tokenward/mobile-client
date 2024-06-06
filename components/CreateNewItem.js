// screens/CreateNewItem.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, database } from '../config/firebase';
import CustomButton from './CustomButton';
import { useRouter } from "expo-router";


export default function CreateNewItem({ navigation }) {
    const [type, setType] = useState('');
    const [label, setLabel] = useState('');
    const [icon, setIcon] = useState('');
    const router = useRouter();


    const handleSave = async () => {
        const user = firebase.auth().currentUser;
        if (user && label && type) {
            const userId = user.uid;
            const newItem = { label, icon };

            await firebase.firestore().collection('users').doc(userId).collection(type).add(newItem);

            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Create New Item</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type (tags, folders, noFolderItems)"
                    value={type}
                    onChangeText={setType}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Label"
                    value={label}
                    onChangeText={setLabel}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Icon URL (optional)"
                    value={icon}
                    onChangeText={setIcon}
                />
                <CustomButton onPress={handleSave} >Save</CustomButton>
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
    input: {
        backgroundColor: '#444',
        color: '#fff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
});