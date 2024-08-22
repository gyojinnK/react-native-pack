import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import Title from "../components/ui/title";

const GameOverScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Title innerText={"GAME OVER!"} />
      <View style={styles.imageContainer}>
        <Image source={require("../assets/success.png")} style={styles.image} />
      </View>
      <Text>Your phone needed X rounds to guess the number Y.</Text>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
