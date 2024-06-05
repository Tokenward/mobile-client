import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import InputBox from "../../../components/InputBox";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../../../components/CustomButton";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleSignIn = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <SafeAreaView style={Styles.mainContainer}>
            <StatusBar backgroundColor="#393939" barStyle="light-content" />
            <View style={Styles.mainContainer}>
                <Text style={Styles.title}>Login</Text>
                <InputBox label={"Password"} hidden={true}></InputBox>
                <InputBox label={"Email"}></InputBox>
                <CustomButton>Login</CustomButton>
            </View>

        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:"#393939",
        height: "100%",
    },
    title: {
        fontSize: 30,
        color: "white",
        textAlign: "center",
        marginTop: 48,
        fontWeight: "bold",
        fontFamily: "roboto",
    },

})