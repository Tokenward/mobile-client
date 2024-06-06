import { View, Text, SafeAreaView, StyleSheet, StatusBar, Alert } from "react-native";
import InputBox from "../../../components/InputBox";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../../../components/CustomButton";
import { auth } from "../../../config/firebase";
import { Stack, useRouter } from "expo-router";
import { Link } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onHandleLogin = () => {
        if (email !== '' && password !== "") {
            console.log("Signing in with Email and Password");
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    router.push('/vault');
                })
                .catch((err) => Alert.alert('Login error', err.message));
        } else {
            Alert.alert('Login error', 'Email and password must not be empty');
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Stack.Screen 
                options={{
                    title: "Login",
                    headerStyle: {
                        backgroundColor: "#393939",
                    },
                    headerTintColor: "#fff"
                }} 
            />
            <StatusBar backgroundColor="#1f1f1f" barStyle="light-content" />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Login</Text>
                <InputBox label={"Email"} value={email} keyboardType="email-address" onChangeText={setEmail} theme="dark" />
                <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword} />
                <CustomButton onPress={onHandleLogin} theme="dark">Login</CustomButton>
                <View style={styles.linkContainer}>
                    <Link href="./signup" style={styles.link}>Sign Up</Link>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#1f1f1f",
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 48,
        fontWeight: "bold",
        fontFamily: "Roboto",
    },
    linkContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    link: {
        color: "#1e90ff",
        textAlign: "center",
        fontSize: 16,
    },
});
