import { createUserWithEmailAndPassword } from "firebase/auth";
import { View, Text, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../../components/InputBox";
import CustomButton from "../../../components/CustomButton";
import { Stack, useRouter } from "expo-router";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../config/firebase";

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    if (email !== '' && password !== "") {
      console.log("Registering with Email and Password");
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          router.push('/vault');
        })
        .catch((err) => Alert.alert('Signup error', err.message));
    } else {
      Alert.alert('Signup error', 'Email and password must not be empty');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Stack.Screen
        options={{
          title: "Register",
          headerStyle: {
            backgroundColor: "#393939",
          },
          headerTintColor: "#fff"
        }}
      />
      <StatusBar backgroundColor="#393939" barStyle="light-content" />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Register</Text>
        <InputBox label={"Email"} value={email} onChangeText={setEmail} />
        <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword} />
        <CustomButton onPress={handleSignUp}>Register</CustomButton>
        <View style={styles.linkContainer}>
          <Link href="./login" style={styles.link}>Login</Link>
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