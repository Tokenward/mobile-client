// app/layout/RootLayout.js

import { Slot } from "expo-router";
import React from "react";
import { StyleSheet, Appearance } from "react-native";
import CustomColors from "../../CustomColors";

export const ThemeContext = React.createContext();

export default function RootLayout() {
  const theme = Appearance.getColorScheme();
  const colors = CustomColors[theme];

  return (
    <ThemeContext.Provider value={colors}>
        <Slot />
    </ThemeContext.Provider>
  );
}