import { signInWithEmailAndPassword } from "firebase/auth";
import { View, Text, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../../components/InputBox";
import CustomButton from "../../../components/CustomButton";
import { Stack, useRouter } from "expo-router";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../config/firebase";
import { TouchableOpacity } from "react-native";

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

    const onClick = () => {
        router.push('/pages/authentification/signup');
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar backgroundColor="#1f1f1f" barStyle="light-content" />
          <Stack.Screen
            options={{
              title: "Login",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#393939",
              },
              headerTintColor: "#fff"
            }}
          />
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Login</Text>
            <InputBox label={"Email"} value={email} keyboardType="email-address" onChangeText={setEmail} />
            <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword} />
            <CustomButton onPress={onHandleLogin}>Login</CustomButton>
            <TouchableOpacity style={styles.linkContainer} onPress={onClick}>
                <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#1f1f1f",
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 48,
        fontWeight: "bold",
        fontFamily: "Roboto",
        marginTop: 16,
    },
    linkContainer: {
        marginTop: 16,
        alignItems: 'center',
    },
    link: {
        color: "#1e90ff",
        textAlign: "center",
        fontSize: 18,
    },
  });