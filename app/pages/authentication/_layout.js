import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
    return (
        <>
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
        ></Stack>
            

    </>
    )
} 