/**
 * Project: Tokenward Mobile-Client
 * File: /app/pages/authentication/LoginScreen.js
 * Description: Implementation of the LoginScreen component which handles user authentication.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../../components/InputBox";
import CustomButton from "../../../components/CustomButton";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../../config/firebase";
import * as LocalAuthentication from 'expo-local-authentication';
import { login, getLocalData, saveDataLocally } from "../../../lib/api/user";

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
      router.push('/vault');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Login error", "Invalid email or password.");
    }
  };

  const onClick = () => {
    router.push('/pages/authentication/signup');
  };

  const handleFaceID = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Face ID not supported", "Your device does not support Face ID.");
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert("Face ID not set up", "Please set up Face ID on your device.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        const localData = await getLocalData();
        if (localData) {
          console.log('Face ID Authentication succeeded. Logging in with:', localData);
          setEmail(localData.email);
          setPassword(localData.password);
          onHandleLogin();
        } else {
          Alert.alert("No saved credentials", "No saved credentials found. Please log in manually first.");
        }
      } else {
        Alert.alert("Authentication failed", "Face ID authentication failed. Please try again.");
      }
    } catch (error) {
      console.error('Face ID error:', error);
      Alert.alert("Face ID error", "An error occurred during Face ID authentication.");
    }
  };

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
        <TouchableOpacity style={styles.faceIDButton} onPress={handleFaceID}>
          <Text style={styles.faceIDText}>Login with Passkey</Text>
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
  faceIDButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#1e90ff",
    borderRadius: 5,
    alignItems: 'center',
  },
  faceIDText: {
    color: "#ffffff",
    fontSize: 18,
  },
});