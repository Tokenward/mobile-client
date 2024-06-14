/**
 * Project: Tokenward Mobile-Client
 * File: /app/layout/RootLayout.js
 * Description: Root layout component that renders the Slot component and handles errors.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import { Slot } from "expo-router";
import React from "react";

export default function RootLayout() {
  try {
    return <Slot />;
  } catch (error) {
    console.error("Error rendering Slot component:", error);
    return null; 
  }
}