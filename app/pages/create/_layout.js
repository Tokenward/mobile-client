/**
 * Project: Tokenward Mobile-Client
 * File: /app/layout/Layout.js
 * Description: Implementation of the Layout component which configures the header and status bar settings.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  try {
    return (
      <>
        <StatusBar style="light" backgroundColor="#eebe03" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#eebe03",
            },
            headerTintColor: "#000",
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