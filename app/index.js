import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

export default function HomeScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userToken = await AsyncStorage.getItem('userToken');
            setIsLoggedIn(!!userToken)
        };

        checkLoginStatus();
    }, []);

    if (isLoggedIn) {
        return <Redirect href="/vault" />;
    } else {
        return <Redirect href="./pages/index" />;
    }
}