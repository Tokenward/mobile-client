import { View, StyleSheet, TextInput, Text } from "react-native"

export default function InputBox({ label, hidden = false }) {
    return (
        <View style={styles.container}> 
            <TextInput 
                style={styles.input}
                placeholder={label} 
                secureTextEntry={hidden}
            ></TextInput>
            
        </View> 
    )
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
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
        borderColor: "#A5A5A5",
        color: "black",
        alignSelf: "center",
    },
}) 