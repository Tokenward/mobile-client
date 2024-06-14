/**
 * Project: Tokenward Mobile-Client
 * File: /app/pages/create/CreatePage.js
 * Description: Implementation of the CreatePage component which includes styling, status bar configuration, and a form for creating new items.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import React from "react";
import { StyleSheet, SafeAreaView, StatusBar, Text } from "react-native";
import { Stack } from "expo-router";
import CreateNewItem from "../../../components/CreateNewItem";

export default function CreatePage() {
  try {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <StatusBar backgroundColor="#1f1f1f" barStyle="light-content" />
        <Stack.Screen
          options={{
            title: "Create",
            headerShown: true,
            headerStyle: {
              backgroundColor: "#393939",
            },
            headerTintColor: "#fff",
          }}
        />
        <Text style={styles.title}>Create</Text>
        <CreateNewItem />
      </SafeAreaView>
    );
  } catch (error) {
    console.error("Error rendering CreatePage component:", error);
    return null;
  }
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
});