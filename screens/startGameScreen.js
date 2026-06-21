import { useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import Colors from "../utils/Colors";
import Title from "../components/Title";
import Card from "../components/Card";
import InstructionText from "../components/InstructionText";

export default function StartGameScreen({ onSelectedNumber }) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  function inputNumberHandler(enteredNumber) {
    setEnteredNumber(enteredNumber);
  }

  function resetHandler() {
    setEnteredNumber("");
  }

  function validateNumberHandler() {
    const choosenNumber = parseInt(enteredNumber); //convert the string to a integer

    //Alert
    if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber >= 100) {
      Alert.alert("Invalid Number..!!", "Number want to be in between 0-100", [
        { text: "Okay", style: "destructive", onPress: resetHandler }, // alert button customize
      ]);

      return;
    }

    console.log("valid data");
    onSelectedNumber(choosenNumber);
  }

  const marginTopDistance = height < 450 ? 30 : 100;

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior="position" style={styles.screen}>
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Select the Number</Title>
          <Card>
            <InstructionText>Enter the number</InstructionText>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              value={enteredNumber}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={setEnteredNumber}
            />
            <View style={styles.buttonOuter}>
              <View style={styles.buttonInner}>
                <PrimaryButton buttonPressed={resetHandler}>
                  Reset
                </PrimaryButton>
              </View>
              <View style={styles.buttonInner}>
                <PrimaryButton buttonPressed={validateNumberHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    //marginTop: 100,
    alignItems: "center",
  },

  numberInput: {
    height: 80,
    width: 80,
    fontSize: 32,
    borderBottomColor: Colors.accent200,
    borderBottomWidth: 2,
    color: Colors.accent200,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonOuter: {
    flexDirection: "row",
    marginVertical: 10,
  },
  buttonInner: {
    flex: 1,
  },
});
