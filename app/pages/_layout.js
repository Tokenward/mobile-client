// app/layout/RootLayout.js

import { Slot } from "expo-router";
import React from "react";
import { View, useColorScheme, StyleSheet, Appearance } from "react-native";
import CustomColors from "../../CustomColors";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

export const ThemeContext = React.createContext();

export default function RootLayout() {
  const theme = Appearance.getColorScheme();
  const colors = CustomColors[theme];

  return (
    <ThemeContext.Provider value={colors}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar style={colors.barStyle} />
        <Slot />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
