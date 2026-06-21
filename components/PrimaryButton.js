import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../utils/Colors";

export default function PrimaryButton({ children, buttonPressed,style,textStyle }) {
  return (
    <View style={[styles.buttonOuterView, style]}>
      <Pressable
        onPress={buttonPressed}
        android_ripple={{ color: Colors.primary300, foreground: true }}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressedItem]
            : styles.buttonInnerContainer
        }
      >
        <Text style={[styles.buttonText, textStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonOuterView: {
    margin: 5,
    backgroundColor: Colors.primary400,
    elevation: 4,
    borderRadius: 23,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontFamily:"open-sans-bold",
    color: "white",
    fontSize: 15,
    //fontWeight: "bold",
    textAlign: "center",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
