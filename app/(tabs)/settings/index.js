import { View, Text, StyleSheet, Modal, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "../../../components/InputBox";
import { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import { sendVerificationEmail, changeUserEmail } from "../../../lib/api/user";
import { Alert } from "react-native";
import firebase from "firebase/compat/app";
import { auth } from "../../../config/firebase";


export default function SettingsScreen() {
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleSendVerification = async () => {
        try {
            await sendVerificationEmail(newEmail);
            setModalVisible(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleNewPassword = async (currentPassword, newPassword, newPasswordConfirm) => {

        if (newPassword !== newPasswordConfirm) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        } else {
            const user = firebase.auth().currentUser;
            const credentials = firebase.auth.EmailAuthProvider.credential(
                user.email,
                currentPassword
            );

            try {
                await user.reauthenticateWithCredential(credentials);

                await user.updatePassword(newPassword);
                Alert.alert('Success', 'Passwords successfully updated.');

            } catch (error) {
                console.error('Error updating password:', error);
            }
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
            <CustomButton onPress={handleSendVerification}>Send Verification Link</CustomButton>

            <Text style={styles.headerText}>Change Password</Text>
            <InputBox label="Current Password" value={currentPassword} onChangeText={setCurrentPassword} hidden={true} />
            <InputBox label="New Password" value={newPassword} onChangeText={setNewPassword} hidden={true} />
            <InputBox label="Repeat new Password" value={newPasswordConfirm} onChangeText={setNewPasswordConfirm} hidden={true} />
            <CustomButton onPress={handleNewPassword}>Confirm new password</CustomButton>


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

});