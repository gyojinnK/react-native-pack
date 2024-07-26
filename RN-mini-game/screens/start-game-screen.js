import { Alert, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/ui/primary-button";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/title";
import Card from "../components/ui/card";
import InstructionText from "../components/ui/instruction-text";

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  const numberInputHandler = (enteredNumber) => {
    setEnteredNumber(enteredNumber);
  };

  const confirmHandler = () => {
    const choseNumber = +enteredNumber;
    if (isNaN(choseNumber) || choseNumber <= 0 || choseNumber > 99) {
      // show alert ...
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetHandler }]
      );
      return;
    }
    onPickNumber(choseNumber);
  };

  const resetHandler = () => {
    setEnteredNumber("");
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <Title innerText={"Guess My Number"} />
      </View>
      <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonSection}>
            <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonSection}>
            <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginTop: 100,
    marginHorizontal: 24,
  },
  numberInput: {
    width: 50,
    height: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonSection: {
    flex: 1,
  },
});
