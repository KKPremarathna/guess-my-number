import { Text, StyleSheet } from "react-native";

import Colors from "../utils/Colors";

export default function InstructionText({ children, style }) {
  return <Text style={[styles.instText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  instText: {
    fontFamily:"open-sans-bold",
    color: Colors.accent200,
    fontSize: 20,
    //fontWeight: "bold",
    elevation: 1,
  },
});
