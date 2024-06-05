import { createUserWithEmailAndPassword } from "firebase/auth";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../../components/InputBox";
import CustomButton from "../../../components/CustomButton";
import { Stack } from "expo-router";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={Styles.mainContainer}>
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
      <View style={Styles.mainContainer}>
        <Text style={Styles.title}>Register</Text>
        <InputBox label={"Email"} value={email} onChangeText={setEmail} theme="dark"></InputBox>
        <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword}></InputBox>
        <CustomButton onPress={handleSignUp} theme="dark">SignUp</CustomButton>
      </View>

    </SafeAreaView>
  )
}
const Styles = StyleSheet.create({
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

})