/**
 * Project: Tokenward Mobile-Client
 * File: /app/layout/Layout.js
 * Description: Implementation of the Layout component which configures the header and status bar settings.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import React, { useContext } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import useThemeContext from "../../../lib/hooks/useThemeContext";

export default function Layout() {
  const colors = useThemeContext();

  try {
    return (
      <>
        <StatusBar style={colors.barStyle} backgroundColor={colors.background} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: colors.onPrimary,
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </>
    );
  } catch (error) {
    console.error("Error rendering Layout component:", error);
    return null;
  }
}