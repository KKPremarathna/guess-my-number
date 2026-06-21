import { 
  Text, 
  View, 
  Image, 
  StyleSheet, 
  useWindowDimensions 
} from "react-native";

import Title from "../components/Title";
import Colors from "../utils/Colors";
import PrimaryButton from "../components/PrimaryButton";

export default function GameOverScreen({ onNewGame, roundsPlayed, userNumber }) {
  const { width, height } = useWindowDimensions();

  // 1. Detect if we are in landscape (width is greater than height)
  const isLandscape = width > height;

  // 2. Aggressively shrink the image for landscape
  let imageSize = 300; 

  if (width < 380) {
    imageSize = 150; 
  }
  if (isLandscape) {
    imageSize = 150; // Perfect size to share the screen
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    margin: isLandscape ? 20 : 36, // Strip all margins from image in landscape
  };

  return (
    <View style={[styles.rootContainer, isLandscape && styles.rootContainerLandscape]}>
      
      {/* Show Title at the top ONLY if we are in Portrait mode */}
      {!isLandscape && <Title>GAME OVER!</Title>}
      
      <View style={isLandscape ? styles.landscapeLayout : styles.portraitLayout}>
        
        {/* LEFT SIDE (in landscape): Image */}
        <View style={[styles.ImageContainer, imageStyle]}>
          <Image
            style={styles.Image}
            source={require("../assets/images/success.png")}
          />
        </View>
        
        {/* RIGHT SIDE (in landscape): Title, Text, and Button */}
        <View style={isLandscape ? styles.textAndButtonLandscape : styles.portraitLayout}>
          
          {/* Show Title here so it shares the right column in Landscape! */}
          {isLandscape && (
            <View style={styles.landscapeTitleWrapper}>
              <Title>GAME OVER!</Title>
            </View>
          )}

          <Text style={[styles.summary, isLandscape && styles.summaryLandscape]}>
            Your phone needed <Text style={styles.highlight}>{roundsPlayed}</Text> rounds to
            guess the number <Text style={styles.highlight}>{userNumber}</Text>.
          </Text>
          
          <PrimaryButton
            style={styles.button}
            textStyle={styles.buttonText}
            buttonPressed={onNewGame}
          >
            Start New Game
          </PrimaryButton>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center", // Perfectly centers everything vertically
    alignItems: "center",
  },
  rootContainerLandscape: {
    padding: 12, // Drastically reduce padding to give elements more room
  },
  portraitLayout: {
    alignItems: "center", 
    justifyContent: "center",
  },
  landscapeLayout: {
    flexDirection: "row", // Side-by-side layout
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    borderWidth: 4,
    overflow: "hidden",
  },
  Image: {
    width: "100%",
    height: "100%",
  },
  textAndButtonLandscape: {
    flex: 1, // Take up all remaining space on the right half
    marginLeft: 16, // Small gap between image and text
    alignItems: "center",
    justifyContent: "center",
  },
  landscapeTitleWrapper: {
    marginBottom: 10, // Gives the Title a little breathing room from the text
  },
  summary: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    color: Colors.primary600,
    marginBottom: 24,
  },
  summaryLandscape: {
    fontSize: 16, // Shrink text heavily to fit perfectly
    marginBottom: 12,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: "white",
  },
  button: {
    backgroundColor: Colors.accent200,
    padding: 5,
  },
  buttonText: {
    color: "black",
  },
});