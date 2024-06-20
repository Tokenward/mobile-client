import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import useThemeContext from "../../lib/hooks/useThemeContext";

export default function CustomButton({ children, onPress }) {
  const colors = useThemeContext();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: colors.primary }]}> 
      <Text style={[styles.buttonText, { color: colors.onPrimary }]}>{children}</Text> 
    </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});