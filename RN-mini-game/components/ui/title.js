import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";

const Title = ({ innerText }) => {
  return <Text style={styles.title}>{innerText}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    overflow: "hidden",
  },
});
