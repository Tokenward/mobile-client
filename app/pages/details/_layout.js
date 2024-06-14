import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function Layout() {
    return (
        <>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1f1f1f',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen name="vault" options={{ title: 'Vault' }} />
                <Stack.Screen name="details" options={{ title: 'Detail' }} />
            </Stack>
        </>
    );
}
