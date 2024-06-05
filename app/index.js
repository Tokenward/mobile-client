/**
 * Project: Tokenward Mobile-Client
 * File: /app/index.js
 * Description: Basic implementation of the HomeScreen component which checks login status and redirects accordingly.
 * Author: Mitja Kurath
 * Date: [2024-05-06]
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";


export default function HomeScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            setIsLoggedIn(!!userToken);
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn) {
        return <Redirect href="/vault" />;
    } else {
        return <Redirect href="/pages/authentification/" />;
    }
}