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
                style={[styles.input, { backgroundColor: colors.surface, color: colors.onSurface }]}
                placeholder={label}
                placeholderTextColor={colors.onSurface} 
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
        marginTop: 5,
        marginBottom: 5,
        fontSize: 16,
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
    },
});
