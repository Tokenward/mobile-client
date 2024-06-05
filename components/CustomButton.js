import { StyleSheet, TouchableOpacity, Text } from "react-native"

export default function CustomButton({ children, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}> 
            <Text style={styles.buttonText}>{children}</Text> 
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        width: "65%",
        marginTop: 5,
        marginBottom: 5,
        fontSize: 24,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "#456EF6",
        color: "black",
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "roboto",
    },
})