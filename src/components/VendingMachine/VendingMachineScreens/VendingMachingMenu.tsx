import { StyleSheet, Text, View, Image, Modal } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { useState } from "react";
import { TransactionInstruction } from "@solana/web3.js";
import React from "react";
import PrimaryButton from "../../PrimaryButton";
import { useNavigation } from "@react-navigation/native";

// type Props = {
//   // title: string;
//   children: JSX.Element | JSX.Element[] | null;
// };

export function VendingMachineMenu() {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View style={styles.heading}>Welcome</View>
      <View>Welcome to the Incubator!</View>
      <PrimaryButton
        title={"Mint your DinoEgg"}
        onPress={() => navigation.navigate("Incubator", { screen: "Mint" })}
      ></PrimaryButton>
      <PrimaryButton
        title={"Hatch your DinoEgg"}
        onPress={() => {}}
      ></PrimaryButton>
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
