/**
 * Project: Tokenward Mobile-Client
 * File: /app/pages/authentication/LoginScreen.js
 * Description: Implementation of the LoginScreen component which handles user authentication.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../../components/essential/InputBox";
import CustomButton from "../../../components/essential/CustomButton";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { login, saveDataLocally, getLocalData } from "../../../lib/api/user";
import useThemeContext from "../../../lib/hooks/useThemeContext";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const colors = useThemeContext();

  useEffect(() => {
    const fetchData = async () => {
      const localData = await getLocalData();
      if (localData) {
        setEmail(localData.email);
        setPassword(localData.password);
      }
    };

    fetchData();
  }, []);

  const onHandleLogin = async () => {
    try {
      console.log('Attempting to log in with email:', email, 'password:', password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        Alert.alert("Login error", "Your email address is not verified. Please verify your email address before logging in.");
        return;
      }
      await login(email, password);
      await saveDataLocally({ email, password });
      router.push('/pages/(tabs)/vault');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Login error", "Invalid email or password.");
    }
  };

  const onClick = () => {
    router.push('/pages/auth/signup');
  };

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <StatusBar backgroundColor={colors.background} barStyle={colors.barStyle} />
      <Stack.Screen
        options={{
          title: "Login",
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.onSurface,
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={[styles.title, { color: colors.onBackground }]}>Login</Text>
        <InputBox label={"Email"} value={email} keyboardType="email-address" onChangeText={setEmail} />
        <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword} />
        <CustomButton onPress={onHandleLogin}>Login</CustomButton>
        <TouchableOpacity style={styles.linkContainer} onPress={onClick}>
          <Text style={[styles.link, { color: colors.link }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
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
    textAlign: "center",
    fontSize: 18,
  },
});
