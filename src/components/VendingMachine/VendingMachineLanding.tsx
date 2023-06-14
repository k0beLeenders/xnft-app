import { StyleSheet, Text, View, Image, Modal } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { useState } from "react";
import { TransactionInstruction } from "@solana/web3.js";
import React from "react";
import { usePublicKeys } from "../../hooks/xnft-hooks";
import { useWallet } from "../../hooks/useWallet";
import { useConnection } from "../../hooks/useConnection";
import { useTokenAccounts } from "../../hooks/useTokenAccounts";
import { createStackNavigator } from "@react-navigation/stack";
import { VendingMachineMenu } from "./VendingMachineScreens/VendingMachingMenu";
import { VendingMachineMint } from "./VendingMachineScreens/VendingMachineMint";

type Props = {
  // title: string;
  children: JSX.Element | JSX.Element[] | null;
};
const Stack = createStackNavigator();

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
      <View style={styles.display}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={VendingMachineMenu}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Mint" component={VendingMachineMint} />
        </Stack.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  typography: {
    color: "rgba(255, 255, 255, 0.85)",
  },
  display: {
    marginHorizontal: "64px",
    marginTop: "112px",
    backgroundColor: "#32363d",
    width: "193px",
    height: "328px",
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
