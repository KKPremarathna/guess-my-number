import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Title from "../components/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import InstructionText from "../components/InstructionText";
import Card from "../components/Card";
import GuessLogItems from "../components/game/GuessLogItems";

function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let maxBoundary = 100;
let minBoundary = 1;

export default function InGameScreen({
  userNumber,
  onGameOver,
  onroundsPlayed,
}) {
  const randomNumber = generateRandomBetween(1, 100, userNumber);
  const [guessedNumber, setGuessedNumber] = useState(randomNumber);
  const [guessrounds, setGuessRounds] = useState([randomNumber]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (guessedNumber == userNumber) {
      onGameOver();
      maxBoundary = 100;
      minBoundary = 1;
    }
  }, [guessedNumber, userNumber, onGameOver]);

  function guessNumberHandler(direction) {
    if (
      (direction === "lower" && guessedNumber < userNumber) ||
      (direction === "greater" && guessedNumber > userNumber)
    ) {
      Alert.alert("Don't Lie..!", "You know this is wrong...", [
        { text: "Sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = guessedNumber;
    } else {
      minBoundary = guessedNumber + 1;
    }
    const newNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      guessedNumber,
    );
    setGuessedNumber(newNumber);
    setGuessRounds((prevRounds) => [newNumber, ...prevRounds]);
    onroundsPlayed();
  }

  const guestRoundListLength = guessrounds.length;

  // 1. Better Landscape Detection
  const isLandscape = width > height;

  // 2. We ONLY use your preferred vertical playing layout now!
  let content = (
    <>
      <NumberContainer>{guessedNumber}</NumberContainer>
      <Card>
        <InstructionText style={styles.InstructionText}>
          Higher or Lower
        </InstructionText>
        <View style={styles.buttonSetOuter}>
          <View style={styles.button}>
            <PrimaryButton buttonPressed={guessNumberHandler.bind(this, "lower")}>
              <Ionicons name="remove" size={24} color={"white"} />
            </PrimaryButton>
          </View>
          <View style={styles.button}>
            <PrimaryButton buttonPressed={guessNumberHandler.bind(this, "greater")}>
              <Ionicons name="add" size={24} color={"white"} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  const paddingDistance = height < 450 ? 20 : 40;

  return (
    <View style={[styles.screen, { paddingTop: paddingDistance }]}>
      <Title>OPPONENT'S GUESS</Title>

      {/* 3. The Dynamic Layout Wrapper */}
      <View style={isLandscape ? styles.landscapeLayout : styles.portraitLayout}>
        
        {/* The Playing Area always goes first (Top in Portrait, Left in Landscape) */}
        <View style={styles.playingArea}>{content}</View>

        {/* The List always goes second (Bottom in Portrait, Right in Landscape) */}
        <View style={styles.listContainer}>
          <FlatList
            data={guessrounds}
            renderItem={(itemData) => (
              <GuessLogItems
                roundNumber={guestRoundListLength - itemData.index}
                guess={itemData.item}
              />
            )}
            keyExtractor={(item) => item.toString()}
          />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  portraitLayout: {
    flex: 1,
    width: "100%", 
    alignItems: "center",
  },
  landscapeLayout: {
    flex: 1,
    flexDirection: "row", // Places playing area on the left, list on the right
    width: "100%",
    alignItems: "center", 
  },
  playingArea: {
    flex: 1, 
    alignItems: "center",
  },
  listContainer: {
    flex: 1, 
    padding: 10,
    alignSelf: "stretch", // Ensures the list can scroll all the way down
  },
  buttonSetOuter: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  InstructionText: {
    marginBottom: 20,
  },
});