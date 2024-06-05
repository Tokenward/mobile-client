import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import InputBox from "../../../components/InputBox";

export default function LoginScreen() {
    return (
        <SafeAreaView style={Styles.mainContainer}>
            <StatusBar backgroundColor="#393939" barStyle="light-content" />
            <View style={Styles.mainContainer}>
                <Text style={Styles.title}>Login</Text>
                <InputBox label={"Password"} hidden={true}></InputBox>
                <InputBox label={"Email"}></InputBox>
            </View>

        </SafeAreaView>
    )
}
const Styles = StyleSheet.create({
    mainContainer: {
        backgroundColor:"#393939",
        height: "100%",
    },
    title: {
        fontSize: 30,
        color: "white",
        textAlign: "center",
        marginTop: 48,
        fontWeight: "bold",
        fontFamily: "roboto",
    },

})