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
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        backgroundColor: "white",
        borderColor: "#A5A5A5",
        color: "black",
        alignSelf: "center",
    },
    buttonText: {
        fontSize: 30,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "roboto",
    },
})