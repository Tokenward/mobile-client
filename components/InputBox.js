import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import CustomColors from "../CustomColors";
import { getOsTheme } from "../lib/util/theme";

export default function InputBox({ label, hidden = false, value, onChangeText, keyboardType }) {
    const theme = getOsTheme();
    const colors = CustomColors[theme];

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder={label}
                placeholderTextColor='#fff' 
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
