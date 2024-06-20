import React, { useState, useContext } from "react";
import { Tabs } from "expo-router";
import { View, TouchableOpacity, StatusBar, Alert, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import useThemeContext from "../../../lib/hooks/useThemeContext";

export default function TabsLayout() {
    const router = useRouter();
    const colors = useThemeContext();

    const HeaderLeft = () => {
        return (
            <TouchableOpacity style={{ marginLeft: 16 }}>
                <Ionicons name="person-circle-outline" size={30} color={colors.onSurface} />
            </TouchableOpacity>
        );
    };

    return (
        <>
            <StatusBar backgroundColor={colors.background} barStyle={colors.barStyle} />
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: colors.background,
                    },
                    headerStyle: {
                        backgroundColor: colors.surface,
                    },
                    headerTintColor: colors.onSurface,
                    tabBarActiveTintColor: colors.onBackground,
                    tabBarInactiveTintColor: colors.onSurface,
                    headerLeft: () => <HeaderLeft />,
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
                                        color={colors.onSurface}
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
                                        color={colors.onSurface}
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
                                        color={colors.onSurface}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push('../create');
                                    }}
                                >
                                    <Ionicons
                                        name="add-outline"
                                        size={24}
                                        color={colors.onSurface}
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