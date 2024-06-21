import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { getUserTeams } from '../../../../lib/api/team';
import useThemeContext from '../../../../lib/hooks/useThemeContext';

export default function WorkspaceScreen() {
    const [teams, setTeams] = useState({ ownedTeams: [], memberTeams: [] });
    const [loading, setLoading] = useState(true);
    const colors = useThemeContext();

    useEffect(() => {
        async function fetchTeams() {
            try {
                const userTeams = await getUserTeams();
                setTeams(userTeams);
            } catch (error) {
                console.error("Error fetching user teams:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTeams();
    }, []);

    if (loading) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.onBackground }}>Loading...</Text>
            </View>
        );
    }

    const filteredMemberTeams = teams.memberTeams.filter(team => 
        !teams.ownedTeams.some(ownedTeam => ownedTeam.id === team.id)
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.header, { color: colors.primary }]}>Workspace</Text>
            <Text style={[styles.subHeader, { color: colors.secondary }]}>Teams You Own</Text>
            <FlatList
                data={teams.ownedTeams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                    href={`../../details/TeamDetailScreen?name=${encodeURIComponent(item.title)}&id=${item.id}`}
                    style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.onSurface }]}
                  >
                        <Text style={[styles.teamName, { color: colors.onBackground }]}>{item.name}</Text>
                    </Link>
                )}
            />
            <Text style={[styles.subHeader, { color: colors.secondary }]}>Teams You're In</Text>
            <FlatList
                data={filteredMemberTeams}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Link
                        href={`../../details/TeamDetailScreen?teamId=${item.id}`}
                        style={[styles.teamContainer, { borderBottomColor: colors.inputBorder }]}
                    >
                        <Text style={[styles.teamName, { color: colors.onBackground }]}>{item.name}</Text>
                    </Link>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    teamContainer: {
        padding: 12,
        borderBottomWidth: 1,
        borderRadius: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    teamName: {
        fontSize: 16,
    },
});