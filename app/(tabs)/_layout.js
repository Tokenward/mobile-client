import { Slot, Tabs } from "expo-router";
import { Text, View, TouchableOpacity, StatusBar, Alert, Modal, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useRouter } from "expo-router";
import { useState } from "react";

export default function TabsLayout() {

    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    const HeaderLeft = () => {
        return (
            <>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginLeft: 16}}>
                    <Ionicons name="person-circle-outline" size={30} color="white" />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => {
                                Alert.alert("Add Account");
                                setModalVisible(false);
                            }}>
                                <Text style={styles.menuItem}>Add Account</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                Alert.alert("Logout");
                                setModalVisible(false);
                            }}>
                                <Text style={styles.menuItem}>Logout</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.menuItem}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>
        );
    };

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
                    headerLeft: () => <HeaderLeft />
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

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalContent: {
        width: 250,
        padding: 20,
        backgroundColor: '#444',
        borderRadius: 10,
        alignItems: 'center',
    },
    menuItem: {
        padding: 10,
        fontSize: 18,
        color: 'black',
    },
});
