import React, { useState, useContext, useEffect } from "react";
import { Tabs } from "expo-router";
import { View, TouchableOpacity, StatusBar, Alert, StyleSheet, Modal, Text, FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import useThemeContext from "../../../lib/hooks/useThemeContext";
import { getUserTeams, declineInvite, acceptInvite } from "../../../lib/api/team";

export default function TabsLayout() {
    const router = useRouter();
    const colors = useThemeContext();
    const [modalVisible, setModalVisible] = useState(false);
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        async function fetchInvites() {
            try {
                const userTeams = await getUserTeams();
                setInvites(userTeams.invitations || []);
            } catch (error) {
                console.error("Error fetching invites:", error);
            }
        }

        fetchInvites();
    }, []);

    const HeaderLeft = () => {
        return (
            <TouchableOpacity style={{ marginLeft: 16 }}>
                <Ionicons name="person-circle-outline" size={30} color={colors.onSurface} />
            </TouchableOpacity>
        );
    };

    const handleAccept = async (id) => {
        try {
            await acceptInvite(id);
            Alert.alert('Accepted', `You have accepted the invite.`);
            setInvites(invites.filter(invite => invite.id !== id));
        } catch (error) {
            console.error("Error accepting invite:", error);
            Alert.alert('Error', 'There was an error accepting the invite.');
        }
    };

    const handleDecline = async (id) => {
        try {
            await declineInvite(id);
            Alert.alert('Declined', `You have declined the invite.`);
            setInvites(invites.filter(invite => invite.id !== id));
        } catch (error) {
            console.error("Error declining invite:", error);
            Alert.alert('Error', 'There was an error declining the invite.');
        }
    };

    const renderInviteItem = ({ item }) => (
        <View style={styles.inviteItem}>
            <Text style={{ color: colors.onBackground }}>{item.name}</Text>
            <View style={styles.inviteButtons}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.primary }]}
                    onPress={() => handleAccept(item.id)}
                >
                    <Text style={{ color: colors.onPrimary }}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: colors.error }]}
                    onPress={() => handleDecline(item.id)}
                >
                    <Text style={{ color: colors.onError }}>Decline</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const BadgeIcon = () => {
        return (
            <View>
                <Ionicons name="mail-outline" size={24} color={colors.onSurface} />
                {invites.length > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{invites.length}</Text>
                    </View>
                )}
            </View>
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
                                        setModalVisible(true);
                                    }}
                                >
                                    <BadgeIcon />
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
                                        router.push('/pages/create');
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={[styles.modalView, { backgroundColor: colors.surface }]}>
                        <Text style={{ color: colors.onBackground, fontSize: 20, fontWeight: 'bold' }}>Team Invites</Text>
                        <FlatList
                            data={invites}
                            keyExtractor={(item) => item.id}
                            renderItem={renderInviteItem}
                        />
                        <TouchableOpacity
                            style={[styles.closeButton, { backgroundColor: colors.primary }]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{ color: colors.onPrimary }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '80%',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
    },
    inviteItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    inviteButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -3,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});