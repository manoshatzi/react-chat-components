import { StyleSheet } from "react-native";
import { Themes } from "@pubnub/chat-components-common";

export const lightColors = {
  inputWrapperBorder: "#9b9b9b",
  inputButtonBackground: "#8e2de2",
  inputButtonTextColor: "#ffffff",
  inputColor: "#585858",
};

export const darkColors = {
  inputWrapperBorder: "#36393f",
  inputButtonBackground: "#8e2de2",
  inputButtonTextColor: "#ffffff",
  inputColor: "#dcddde",
};

export default (theme: Themes | ""): StyleSheet => {
  const colors = ["light", "support", "event"].includes(theme) ? lightColors : darkColors;

  return StyleSheet.create({
    inputWrapper: {
      alignItems: "center",
      borderColor: colors.inputWrapperBorder,
      borderRadius: 5,
      borderWidth: 1,
      flexDirection: "row",
      margin: 5,
      padding: 5,
    },
    input: {
      color: colors.inputColor,
      flex: 1,
      fontSize: 17,
      height: 40,
    },
    inputButton: {
      alignItems: "center",
      backgroundColor: colors.inputButtonBackground,
      borderRadius: 5,
      height: 40,
      justifyContent: "center",
      minWidth: 60,
    },
    inputButtonText: {
      color: colors.inputButtonTextColor,
      fontSize: 17,
      fontWeight: "bold",
    },
  });
};
