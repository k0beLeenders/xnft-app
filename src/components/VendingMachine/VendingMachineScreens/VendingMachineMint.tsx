import { StyleSheet, Text, View, Image, Modal } from "react-native";
import React from "react";
import PrimaryButton from "../../PrimaryButton";

export function VendingMachineMint() {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>Insert Egg Tokens</View>
      <View>Insert input</View>
      <PrimaryButton title={"Mint Egg NFT"} onPress={() => {}}></PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    backgroundColor:
      "linear-gradient(rgb(126, 128, 212) 0%, rgb(153, 99, 212) 100%)",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 3px 3px 2px",
    fontWeight: 700,
    padding: "10px",
    fontSize: "16px",
    borderRadius: 10,
  },
  typography: {
    color: "rgba(255, 255, 255, 0.85)",
  },
  container: {
    color: "rgba(255, 255, 255, 0.85)",
    backgroundColor: "#32363d",
    padding: "10px",
    width: "193px",
    height: "328px",
  },
});
