import { StyleSheet, Text, View, Image, Modal, Pressable } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NumberInput } from "./NumberInput";
import React from "react";

type Props = {
  // title: string;
  stakedBalance: number;
  walletBalance: number;
  isStake: boolean;
  handleStake: (amount: number) => void;
  handleUnstake: (amount: number) => void;
  closeModal: () => void;
  children: JSX.Element | JSX.Element[] | null;
};

export function LoveShackModal({
  stakedBalance,
  walletBalance,
  isStake,
  closeModal,
  handleStake,
  handleUnstake,
  children,
}: Props) {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => setAmount(0), [isStake]);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Love Shack DINO pool</Text>
          <Pressable onPress={closeModal}>
            <MaterialCommunityIcons
              style={{ cursor: "pointer" } as any}
              name="close"
              color={"white"}
              size={24}
            />
          </Pressable>
        </View>
        <View style={styles.sliderLabels}>
          <Text style={styles.modalText}>
            Currently staked: {stakedBalance.toFixed(0)}
          </Text>
          <Text style={styles.modalText}>
            Balance: {walletBalance.toFixed(0)}
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            minimumValue={0}
            maximumValue={isStake ? walletBalance : stakedBalance}
            value={amount}
            step={1}
            onValueChange={(value) => setAmount(value[0])}
          />
        </View>
        <View style={[styles.sliderLabels, styles.sliderBottomLabel]}>
          <NumberInput
            min={0}
            max={isStake ? walletBalance : stakedBalance}
            onValueChange={(value) => setAmount(value)}
            amount={amount}
          />
          <View style={styles.maxSection}>
            <Pressable
              onPress={() => setAmount(isStake ? walletBalance : stakedBalance)}
            >
              <Text style={styles.maxLabel}>Max</Text>
            </Pressable>
            <Text style={styles.dinoLabel}>DINO</Text>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <PrimaryButton
            title={isStake ? "Stake" : "Unstake"}
            onPress={() =>
              isStake ? handleStake(amount) : handleUnstake(amount)
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    color: "white",
  },
  modalView: {
    width: "100%",
    maxWidth: "520px",
    backgroundColor: "#1a2029",
    margin: 20,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSection: {
    marginTop: "20px",
    marginHorizontal: "auto",
    width: "50%",
  },
  sliderLabels: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sliderBottomLabel: {
    backgroundColor: "rgba(66, 66, 83, 0.3)",
    height: "40px",
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  sliderContainer: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
  },
  header: {
    borderBottomWidth: 1,
    borderBottom: "1px solid",
    borderBottomColor: "#303030",
    marginBottom: 20,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "10px",
  },
  headerText: {
    textAlign: "left",
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  textStyle: {
    color: "inherit",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  inputAmount: {
    borderWidth: 0,
    backgroundColor: "unset",
  },
  maxLabel: {
    color: "#59b6ff",
    textTransform: "uppercase",
    fontSize: 12,
    marginVertical: "auto",
  },
  dinoLabel: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    marginVertical: "auto",
  },
  maxSection: {
    flexDirection: "row",
    gap: 10,
  },
});
