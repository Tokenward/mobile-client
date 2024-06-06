import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "../../../components/InputBox"
import { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import {changeUserEmail} from "../../../lib/api/user"

export default function SettingsScreen() {
    const [NewEmail, setNewEmail] = useState('');

    const handleSave = () => {
        changeUserEmail(NewEmail);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.headerText}>Change Email</Text>
            <InputBox label="New Email" value={NewEmail} onChangeText={setNewEmail} />
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
    header: {
        padding: 16,
        backgroundColor: '#444',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#555',
    },
    headerText: {
        fontSize: 24,
        color: '#fff',
    },
    container: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 18,
        color: '#bbb',
        marginVertical: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});