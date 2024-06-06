import { StyleSheet, SafeAreaView, StatusBar, } from "react-native";
import { Stack } from "expo-router";
import { router } from "expo-router";
import { Text } from "react-native";
import CustomButton from "../../../components/CustomButton";
import CreateNewItem from "../../../components/CreateNewItem";

export default function CreatePage() {


    return (
        <SafeAreaView style={styles.mainContainer}>
            <StatusBar backgroundColor="#1f1f1f" barStyle="light-content" />
          <Stack.Screen
            options={{
              title: "Login",
              headerShown: false,
              headerStyle: {
                backgroundColor: "#393939",
              },
              headerTintColor: "#fff"
            }}
          />
            <Text style={styles.title}>Create</Text>
            <CreateNewItem />

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#1f1f1f",
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        color: "#ffffff",
        textAlign: "center",
        marginBottom: 48,
        fontWeight: "bold",
        fontFamily: "Roboto",
        marginTop: 16,
    },
});