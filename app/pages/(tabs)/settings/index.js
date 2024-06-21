import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBox from '../../../../components/essential/InputBox';
import CustomButton from '../../../../components/essential/CustomButton';
import useThemeContext from '../../../../lib/hooks/useThemeContext';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const colors = useThemeContext();
    const router = useRouter();
    const auth = getAuth();

    const logoutUser = () => {
        signOut(auth)
           .then(() => {
            console.log('signed out lil bro')
                router.push('/pages/auth');
            })
           .catch((error) => {
                console.error('Sign out error:', error);
                Alert.alert('Error', 'An error occurred while signing out. Please try again later.');
            });
    }

    const handleChangePassword = () => {
        if (oldPassword !== newPassword) {
            if (newPassword === confirmPassword) {
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

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <ScrollView>
                <View style={styles.container}>
                    <View style={[styles.settingContainer, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.headerText, { color: colors.onSurface }]}>Change Password</Text>
                        <InputBox label="Current Password" value={oldPassword} hidden={true} onChangeText={setOldPassword} />
                        <InputBox label="New Password" value={newPassword} hidden={true} onChangeText={setNewPassword} />
                        <InputBox label="Confirm Password" value={confirmPassword} hidden={true} onChangeText={setConfirmPassword} />
                        <CustomButton onPress={handleChangePassword}>Confirm new password</CustomButton>
                    </View>
                    <View style={[styles.settingContainer, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.headerText, { color: colors.onSurface }]}>Change Email</Text>
                        <InputBox label="New Email" value={newEmail} hidden={false} onChangeText={setNewEmail} />
                        <CustomButton>Confirm new Email</CustomButton>
                    </View>
                    <View style={[styles.settingContainer, { backgroundColor: colors.surface }]}>
                        <CustomButton onPress={logoutUser}>Logout</CustomButton>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        padding: 16,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 16,
    },
    settingContainer: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 10,
    }
});
