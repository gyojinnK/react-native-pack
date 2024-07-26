import { Alert, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/title";
import { useEffect, useState } from "react";
import NumberContainer from "../components/game/number-container";
import PrimaryButton from "../components/ui/primary-button";
import InstructionText from "../components/ui/instruction-text";
import Card from "../components/ui/card";

import { Ionicons } from "@expo/vector-icons";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({ userNumber, setIsGameOver }) => {
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  useEffect(() => {
    if (currentGuess === userNumber) {
      setIsGameOver(true);
    }
  }, [currentGuess, userNumber, setIsGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    direction === "lower"
      ? (maxBoundary = currentGuess)
      : (minBoundary = currentGuess + 1);
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title innerText={"Opponent's Guess"} />
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Card>
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonSection}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                <Ionicons name="remove" size={24} color={"white"} />
              </PrimaryButton>
            </View>
            <View style={styles.buttonSection}>
              <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                <Ionicons name="add" size={24} color={"white"} />
              </PrimaryButton>
            </View>
          </View>
        </Card>
      </View>
      {/* <View>LOG ROUND</View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  buttonSection: {
    flex: 1,
  },
});
