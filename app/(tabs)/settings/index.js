import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { SafeAreaView } from 'react-native';
import InputBox from '../../../components/InputBox';
import CustomButton from '../../../components/CustomButton';

export default function SettingsScreen() {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [newEmail, setNewEmail] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const handleSendVerification = async () => {
        try {
            await sendVerificationEmail(newEmail);
            setModalVisible(true);
        } catch (err) {
            setError(err.message);
        }
    };


    const handleChangePassword = () => {
        if (oldPassword !== newPassword) {
            if (oldPassword === confirmPassword) {
                const user = auth.currentUser;
                const credential = EmailAuthProvider.credential(user.email, oldPassword);

                reauthenticateWithCredential(user, credential)
                    .then(() => {
                        updatePassword(user, newPassword)
                            .then(() => {
                                console.log('Password updated successfully!');
                                Alert.alert('Success', 'Your password has been updated successfully.');
                            })
                            .catch((error) => {
                                console.error('Password update error:', error);
                                Alert.alert('Error', 'An error occurred while updating your password. Please try again later.');
                            });
                    })
                    .catch((error) => {
                        console.error('Reauthentication error:', error);
                        Alert.alert('Error', 'Your old password is incorrect. Please try again.');
                    });
            } else {
                Alert.alert('Error', 'Your new password and confirm password do not match. Please try again.');
            }
        } else {
            Alert.alert('Error', 'Your new password cannot be the same as your old password. Please try again.');
        }
    };

    const handleChangeEmail = () => {
        const uid = user.uid;
        
    }


    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.container}>
                <View style={styles.settingContainer}>
                    <Text style={styles.headerText}>Change Password</Text>
                    <InputBox label="Current Password" value={oldPassword} onChangeText={setOldPassword} hidden={true} />
                    <InputBox label="New Password" value={newPassword} onChangeText={setNewPassword} hidden={true} />
                    <InputBox label="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} hidden={true} />
                    <CustomButton onPress={handleChangePassword}>Confirm new password</CustomButton>
                </View>
                <View style={styles.settingContainer}>
                    <Text style={styles.headerText}>Change Email</Text>
                    <InputBox label="Current Password" value={newEmail} onChangeText={setNewEmail} hidden={false} />
                    <CustomButton onPress={handleChangeEmail}>Confirm new Email</CustomButton>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#333',
        padding: 30,
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 16,
    },
    container: {
        margin: 16,
    },
    settingContainer: {
        backgroundColor: '#393939',
        marginBottom: 16,
        padding: 16,
        borderRadius: 10,
    }
});