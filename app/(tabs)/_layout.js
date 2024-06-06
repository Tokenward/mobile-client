import { Slot, Tabs } from "expo-router";
import { Text, View, TouchableOpacity, StatusBar, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useRouter } from "expo-router";

export default function TabsLayout() {

    const router = useRouter();

    return (
        <>
            <StatusBar backgroundColor="#1f1f1f" barStyle="light-content" />
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: '#1f1f1f',
                    },
                    headerStyle: {
                        backgroundColor: '#1f1f1f',
                    },
                    headerTintColor: '#fff',
                    tabBarActiveTintColor: '#fff',
                    tabBarInactiveTintColor: '#888',
                }}
            >
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
                        ),
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', marginRight: 15 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("Search button pressed!");
                                    }}
                                    style={{ marginRight: 15 }}
                                >
                                    <Ionicons
                                        name="search-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        console.log("Plus button pressed!");
                                    }}
                                >
                                    <Ionicons
                                        name="add-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        ),
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
                        ),
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', marginRight: 15 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert("Not Implemented yet");
                                    }}
                                    style={{ marginRight: 15 }}
                            
                                >
                                    <Ionicons
                                        name="search-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push('../../pages/create');
                                        
                                    }}
                                >
                                    <Ionicons
                                        name="add-outline"
                                        size={24}
                                        color="white"
                                    />
                                </TouchableOpacity>
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings/index"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ color }) => (
                            <Ionicons
                                size={30}
                                style={{ marginBottom: -3 }}
                                name="settings-outline"
                                color={color}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
