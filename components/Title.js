import { Text, StyleSheet } from "react-native";
import Colors from "../utils/Colors";

export default function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily:"open-sans-bold",
    color: Colors.primary400,
    borderWidth: 2,
    borderColor: Colors.primary400,
    padding: 12,
    borderRadius: 8,
    //fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
});
