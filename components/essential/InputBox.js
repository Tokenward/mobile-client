import React, { useContext } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { ThemeContext } from "../../app/pages/_layout";
import useThemeContext from "../../lib/hooks/useThemeContext";

export default function InputBox({ label, hidden = false, value, onChangeText, keyboardType }) {
    const colors = useThemeContext();

    return (
        <View style={styles.container}>
            <TextInput 
                style={[
                    styles.input, 
                    { 
                        color: colors.inputText, 
                        backgroundColor: colors.inputBackground, 
                        borderColor: colors.inputBorder 
                    }
                ]}
                placeholder={label}
                placeholderTextColor={colors.inputText} 
                secureTextEntry={hidden}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
            />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: { 
        width: "100%", 
        marginBottom: 15,
        alignItems: "center",
    },
    input: {
        height: 48,
        width: "100%",
        color: 'white',
        backgroundColor: '#444',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        marginTop: 5,
        marginBottom: 5,
        fontSize: 16,
        padding: 10,
        alignSelf: "center",
        borderWidth: 1,
        elevation: 5,
    },
});