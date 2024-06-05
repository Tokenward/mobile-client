import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import CustomColors from "../CustomColors";
import { getOsTheme } from "../lib/util/theme";

export default function InputBox({ label, hidden = false, value, onChangeText }) {
    const theme = getOsTheme();
    const colors = CustomColors[theme];

    return (
        <View style={[styles.container]}> 
            <TextInput 
                style={[styles.input, { backgroundColor: colors.surface, color: colors.onSurface }]}
                placeholder={label}
                placeholderTextColor={colors.onSurface} 
                secureTextEntry={hidden}
                value={value}
                onChangeText={onChangeText}
            />
        </View> 
    );
}

const styles = StyleSheet.create({
    container: { 
        width: "auto", 
        marginBottom: 15 
    },
    input: {
        height: 48,
        width: "65%",
        marginTop: 5,
        marginBottom: 5,
        fontSize: 15,
        borderRadius: 10,
        padding: 10,
        alignSelf: "center",
    },
});
