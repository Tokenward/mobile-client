import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InputBox from '../../../../components/essential/InputBox';
import CustomButton from '../../../../components/essential/CustomButton';
import useThemeContext from '../../../../lib/hooks/useThemeContext';
export default function SettingsScreen() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const colors = useThemeContext();

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={styles.container}>
                <View style={[styles.settingContainer, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.headerText, { color: colors.onSurface }]}>Change Password</Text>
                    <InputBox label="Current Password" value={oldPassword} hidden={true} onChangeText={setOldPassword} />
                    <InputBox label="New Password" value={newPassword} hidden={true} onChangeText={setNewPassword} />
                    <InputBox label="Confirm Password" value={confirmPassword} hidden={true} onChangeText={setConfirmPassword} />
                    <CustomButton>Confirm new password</CustomButton>
                </View>
                <View style={[styles.settingContainer, { backgroundColor: colors.surface }]}>
                    <Text style={[styles.headerText, { color: colors.onSurface }]}>Change Email</Text>
                    <InputBox label="Current Password" value={newEmail} hidden={false} onChangeText={setNewEmail} />
                    <CustomButton>Confirm new Email</CustomButton>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 30,
    },
    headerText: {
        fontSize: 24,
        marginBottom: 16,
    },
    container: {
        margin: 16,
    },
    settingContainer: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 10,
    }
});