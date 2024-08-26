import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/primary-button";
import { useState } from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/title";
import Card from "../components/ui/card";
import InstructionText from "../components/ui/instruction-text";

const StartGameScreen = ({ onPickNumber }) => {
  const [enteredNumber, setEnteredNumber] = useState("");

  // Dimensions의 허점을 해결해는 hook
  // 화면이 변경되거나 회전할 때 마다 그에 맞는 크기, 치수를 반환
  const { width, height } = useWindowDimensions();

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

  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position">
        {/*
         KeyboardAvoidingView는 하단 키보드가 활성화되면 해당 태그로 감싸고 있는 요소들이 위로 밀려나게 할 수 있음
         추가로 다른 요소를 클릭하면 키보드가 닫힘.
         */}
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
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
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default StartGameScreen;

// const deviceHeight = Dimensions.get("window").height;
// Dimensions는 처음 컴포넌트가 실행될 때 화면의 값을    단 한 번만 가져옴
// 만약 사용자가 앱 사용 도중 화면을 돌린다면 원하지 않는 디바이스 크기가 변수에 하드코딩 될 수 있음

const styles = StyleSheet.create({
  rootContainer: {
    // marginTop: deviceHeight < 380 ? 30 : 100,
    alignItems: "center",
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
