import { View, Text, SafeAreaView, StyleSheet, StatusBar, Alert } from "react-native";
import InputBox from "../../../components/InputBox";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import CustomButton from "../../../components/CustomButton";
import { auth } from "../../../config/firebase";
import { useRouter } from 'expo-router'; 

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const onHandleLogin = () => {
        console.log("Login Button Pressed!!!!");
        if (email !== '' && password !== "") {
            console.log("Signing in with Email and Password");
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    console.log('Login success');
                    router.push('/vault'); 
                })
                .catch((err) => Alert.alert('Login error', err.message));
        } else {
            Alert.alert('Login error', 'Email and password must not be empty');
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar backgroundColor="#393939" barStyle="light-content" />
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Login</Text>
                <InputBox 
                    label={"Email"} 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                    theme="dark"
                />
                <InputBox 
                    label={"Password"} 
                    hidden={true} 
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                />
                <CustomButton onPress={onHandleLogin} theme="dark">Login</CustomButton>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#393939",
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
});
