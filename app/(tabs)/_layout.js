import { Slot, Tabs } from "expo-router"
import { Text } from "react-native"
import Ionicons from "@expo/vector-icons/Ionicons"

export default function TabsLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="workspace/index"
                options={{
                    title: "Workspace",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={30}
                            style={{ marginBottom: -3 }}
                            name="briefcase-outline"
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="vault/index"
                options={{
                    title: "Vault",
                    tabBarIcon: ({ color }) => (
                        <Ionicons
                            size={30}
                            style={{ marginBottom: -3 }}
                            name="lock-closed-outline"
                            color={color}
                        />
                    )
                }}
            />
            <Tabs.Screen 
                name="settings/index"
                options={{
                    title: "Settings",
                    tabBarIcon:({ color }) => (
                        <Ionicons 
                            size={30}
                            style={{marginBottom: -3}}
                            name="settings-outline"
                            color={color}
                        />
                    )
                }}
            />
        </Tabs>
    )
}