import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "../../../components/InputBox";
import { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { changeUserEmail } from "../../../lib/api/user";
import { Alert } from "react-native";

export default function SettingsScreen() {
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSave = async () => {
        try {
            await changeUserEmail(newEmail);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.headerText}>Change Email</Text>
            <InputBox label="New Email" value={newEmail} onChangeText={setNewEmail} />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <CustomButton onPress={handleSave}>Save</CustomButton>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#333',
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
    },
    errorText: {
        color: 'red',
        marginVertical: 10,
    },
});
