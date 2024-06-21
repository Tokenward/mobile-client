import { SafeAreaView } from "react-native";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";


export default function TeamDetailScreen() {
    const params = useLocalSearchParams();
    const { type, id, name } = params;

    return (
        <SafeAreaView>
            <Text>
                {name}
            </Text>
        </SafeAreaView>
    )
}