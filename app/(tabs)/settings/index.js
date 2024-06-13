import { View, Text, StyleSheet, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "../../../components/InputBox";
import { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { sendVerificationEmail, changeUserEmail } from "../../../lib/api/user";
import { Alert } from "react-native";

export default function SettingsScreen() {
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSendVerification = async () => {
        try {
            await sendVerificationEmail(newEmail);
            setModalVisible(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSave = async () => {
        try {
            await changeUserEmail(newEmail);
            Alert.alert('Success', 'Email change process initiated. Please verify your new email.');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.headerText}>Change Email</Text>
            <InputBox label="New Email" value={newEmail} onChangeText={setNewEmail} />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <CustomButton onPress={handleSendVerification}>Send Verification Link</CustomButton>
            <Text style={styles.headerText}>Change Email</Text>
            <InputBox label="New Password" value={newEmail} onChangeText={setNewEmail} />
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