import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  children: JSX.Element | JSX.Element[] | null;
};

export default function PrimaryButton({ onPress, title }: Props) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: "#fff",
    border: "1px solid rgb(67, 67, 67)",
    textShadow: "0 -1px 0 rgb(0 0 0 / 12%)",
    background: "#b73fcb",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 3px 3px 2px",
    transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s",
    textAlign: "center",

    height: "32px",
    padding: "4px 15px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: 15,

    fontWeight: 700,
    width: "100%",
  },

  //   "button:hover": {
  //     textDecoration: "none",
  //     background: "transparent",
  //     color: "rgb(183, 63, 203)",
  //     borderColor: "rgb(183, 63, 203)",
  //   },

  text: {
    // fontSize: 16,
    // lineHeight: 21,
    // fontWeight: "bold",
    // letterSpacing: 0.25,
    // color: "white",
  },
});
