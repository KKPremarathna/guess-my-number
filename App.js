import { useState, useEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import StartGameScreen from "./screens/startGameScreen";
import InGameScreen from "./screens/inGameScreen";
import Colors from "./utils/Colors";
import GameOverScreen from "./screens/gameOverScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameOver, setGameOver] = useState(true);
  const [newGame, setNewGame] = useState(true);
  const [roundsPlayed, setRoundsPlayed] = useState(1);

  const [loaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  function selectedNumberHandler(selectedNumber) {
    setUserNumber(selectedNumber);
    setNewGame(false);
    setGameOver(false);
  }

  function gameOverHandler() {
    setGameOver(true);
  }

  function newGameHandler() {
    setNewGame(true);
    setGameOver(true);
    setUserNumber(null);
    setRoundsPlayed(1);
  }

  function roundsPlayedHandler() {
    setRoundsPlayed((roundsPlayed) => roundsPlayed + 1);
  }

  let screen = <StartGameScreen onSelectedNumber={selectedNumberHandler} />;

  if (newGame) {
    screen = <StartGameScreen onSelectedNumber={selectedNumberHandler} />;
  }

  if (userNumber) {
    screen = (
      <InGameScreen
        userNumber={userNumber}
        onGameOver={gameOverHandler}
        onroundsPlayed={roundsPlayedHandler}
      />
    );
  }

  if (gameOver && userNumber) {
    screen = (
      <GameOverScreen
        onNewGame={newGameHandler}
        roundsPlayed={roundsPlayed}
        userNumber={userNumber}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.accent200, Colors.primary300]}
      style={styles.rootStyles}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootStyles}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaProvider>
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </SafeAreaProvider>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootStyles: {
    flex: 1,
  },
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
