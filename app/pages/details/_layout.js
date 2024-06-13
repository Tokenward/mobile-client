import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import VaultScreen from '../../(tabs)/vault';
import DetailScreen from '.';

export default function Layout() {
    return (
        <>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#eebe03',
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen name="VaultScreen" component={VaultScreen} options={{ title: 'Vault' }} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} options={{ title: 'Detail' }} />
            </Stack>
        </>
    )}