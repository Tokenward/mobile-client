import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import InputBox from "../../../components/InputBox";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../../../components/CustomButton";
import { auth } from "../../../config/firebase";
import { Stack } from "expo-router";
import { Link } from "expo-router";

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
            <Stack.Screen options={{ title: "Login"}} />
            <StatusBar backgroundColor="#393939" barStyle="light-content" />
            <View style={Styles.mainContainer}>
                <Text style={Styles.title}>Login</Text>
                <InputBox label={"Email"} value={email} onChangeText={setEmail} theme="dark"></InputBox>
                <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword}></InputBox>
                <CustomButton onPress={handleSignIn} theme="dark">Login</CustomButton>
                <Link href="./signup">SignUp</Link>

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