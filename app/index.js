/**
 * Project: Tokenward Mobile-Client
 * File: /app/index.js
 * Description: Basic implementation of the HomeScreen component which checks login status and redirects accordingly.
 * Author: Mitja Kurath
 * Date: [2024-06-14]
 */

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setIsLoggedIn(!!user);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setIsLoggedIn(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  if (isLoggedIn === null) {
    return null;
  }

  return <Redirect href={isLoggedIn ? "/vault" : "/pages/authentication/"} />;
}