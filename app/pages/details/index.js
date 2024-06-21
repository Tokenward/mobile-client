import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import useGoBack from '../../../lib/hooks/useGoBack';
import CustomButton from '../../../components/essential/CustomButton';
import { useLocalSearchParams } from 'expo-router';
import useThemeContext from '../../../lib/hooks/useThemeContext';
import Stack from 'expo-router';

export default function detailScreen() {
    const params = useLocalSearchParams();
    const goBack = useGoBack();

    const colors = useThemeContext();


    // Safely access the name parameter
    const name = params?.name ?? 'Unknown';

    return (
        <SafeAreaView style={styles.container}>

            <Text style={styles.headerText}>{name}</Text>

            <View style={styles.buttonContainer}>
                <CustomButton onPress={goBack}>
                    <Text>Go Back</Text>
                </CustomButton>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 45,
        marginBottom: 16,
        fontWeight: "bold"
    },
    container: {
        padding: 16,
        alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        width: "70%",
    },
})
