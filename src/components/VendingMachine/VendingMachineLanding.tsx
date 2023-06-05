import { StyleSheet, Text, View, Image, Modal } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { useState } from "react";
import { TransactionInstruction } from "@solana/web3.js";
import React from "react";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { useWallet } from "../../hooks/useWallet";
import { useConnection } from "../../hooks/useConnection";
import { useTokenAccounts } from "../../hooks/useTokenAccounts";

type Props = {
  // title: string;
  children: JSX.Element | JSX.Element[] | null;
};

export function VendingMachineLanding({ children }: Props) {
  const keys = usePublicKeys();
  const { publicKey } = useWallet();
  const connection = useConnection();
  const { tokenAccounts, getTokenAccounts } = useTokenAccounts();

  return (
    <View style={styles.container}>
      <Image
        style={styles.loveshack}
        alt="testing"
        source={require("../../assets/vending_machine_v2.png")}
      />
      <View style={styles.display}>Hi</View>
    </View>
  );
}

const styles = StyleSheet.create({
  typography: {
    color: "rgba(255, 255, 255, 0.85)",
  },
  display: {
    marginHorizontal: "62px",
    marginTop: "110px",
    backgroundColor: "red",
    opacity: 0.4,
    width: "196px",
    height: "332px",
  },
  loveshack: {
    position: "absolute",
    margin: "auto",
    height: "517px",
    width: "320px",
  },
  container: {
    position: "relative",
    margin: "10px",
    height: "517px",
    width: "320px",
    // backgroundColor: "rgb(50, 54, 61)",
    // borderRadius: 15,
    // fontSize: 14,
    // fontWeight: "400",
  },
});
