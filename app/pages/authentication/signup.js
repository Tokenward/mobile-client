import { View, Text, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../../components/InputBox";
import CustomButton from "../../../components/CustomButton";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native";
import { signup } from "../../../lib/api/user";

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    try {
      signup(email, password);
    } catch(err) {
      Alert.alert('Error while signup', err);
    }
  };

  const onClick = () => {
    router.push('./');
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar backgroundColor="#1f1f1f" barStyle="light-content" />
      <Stack.Screen
        options={{
          title: "SignUp",
          headerShown: false,
          headerStyle: {
            backgroundColor: "#393939",
          },
          headerTintColor: "#fff"
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>SignUp</Text>
        <InputBox label={"Email"} value={email} keyboardType="email-address" onChangeText={setEmail} />
        <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword} />
        <CustomButton onPress={handleSignUp}>SignUp</CustomButton>
        <TouchableOpacity style={styles.linkContainer} onPress={onClick}>
          <Text style={styles.link}>Login</Text>
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