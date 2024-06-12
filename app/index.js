/**
 * Project: Tokenward Mobile-Client
 * File: /app/index.js
 * Description: Basic implementation of the HomeScreen component which checks login status and redirects accordingly.
 * Author: Mitja Kurath
 * Date: [2024-05-06]
 */

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  if (isLoggedIn) {
    return <Redirect href="/vault" />;
  } else {
    return <Redirect href="/pages/authentification/" />;
  }
}