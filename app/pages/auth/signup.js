/**
 * Project: Tokenward Mobile-Client
 * File: /app/pages/authentication/RegisterScreen.js
 * Description: Implementation of the RegisterScreen component which handles user registration.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import InputBox from "../../../components/essential/InputBox";
import CustomButton from "../../../components/essential/CustomButton";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { signup } from "../../../lib/api/user";
import useThemeContext from "../../../lib/hooks/useThemeContext";

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const colors = useThemeContext();

  const onHandleSignup = async () => {
    try {
      await signup(email, password);
      router.push('../auth');
    } catch (err) {
      console.error('Signup error:', err);
      Alert.alert('Signup error', 'An error occurred while signing up.');
    }
  };

  const onClick = () => {
    router.push('/pages/auth');
  };

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <StatusBar backgroundColor={colors.background} barStyle={colors.barStyle} />
      <Stack.Screen
        options={{
          title: "SignUp",
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.onSurface,
        }}
      />
      <View style={styles.mainContainer}>
        <Text style={[styles.title, { color: colors.onBackground }]}>SignUp</Text>
        <InputBox label={"Email"} value={email} keyboardType="email-address" onChangeText={setEmail} />
        <InputBox label={"Password"} hidden={true} value={password} onChangeText={setPassword} />
        <CustomButton onPress={onHandleSignup}>SignUp</CustomButton>
        <TouchableOpacity style={styles.linkContainer} onPress={onClick}>
          <Text style={[styles.link, { color: colors.link }]}>Login</Text>
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
