/**
 * Project: Tokenward Mobile-Client
 * File: /app/layout/RootLayout.js
 * Description: Root layout component that renders the Slot component and handles errors.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import { Slot } from "expo-router";
import React from "react";
import { View, useColorScheme, StyleSheet, Appearance } from "react-native";
import CustomColors from "../../CustomColors";
import { StatusBar } from "expo-status-bar";

export const ThemeContext = React.createContext();

export default function RootLayout() {
  const theme = Appearance.getColorScheme();
  const colors = CustomColors[theme];

  console.log(theme)

  try {
    return (
      <ThemeContext.Provider value={colors}>
        <View style={[styles.container, { backgroundColor: colors.background }]}>
          <StatusBar style={colors.barStyle}/>
          <Slot />
        </View>
      </ThemeContext.Provider>
    );
  } catch (error) {
    console.error("Error rendering Slot component:", error);
    return null; 
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});