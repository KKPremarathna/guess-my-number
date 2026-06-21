import { View, Text, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";

export default function GuessLogItems({ roundNumber, guess }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>#{roundNumber}</Text>
      <Text style={styles.text}>Opponent's guess: {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 15,
    backgroundColor: Colors.accent200,
    borderColor: Colors.primary600,
    borderRadius: 40,
    width: "100%",
  },
  text: {
    fontFamily: "open-sans-bold ",
    fontSize: 15,
  },
});
