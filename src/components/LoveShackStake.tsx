import { StyleSheet, Text, View, Image, Modal } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { usePublicKeys } from "../hooks/xnft-hooks";
import { useDinoStakingCard } from "../hooks/useDinoStakingCard";
import * as utils from "../utils";
import PrimaryButton from "./PrimaryButton";
import { useState } from "react";
import { LoveShackModal } from "./LoveShackModal";
import { useTokenAccounts } from "../hooks/useTokenAccounts";
import { DINO_MINT } from "../consts";
import { useWallet } from "../hooks/useWallet";
import { useLoveshack } from "../hooks/useLoveshack";
import { TransactionInstruction } from "@solana/web3.js";
import { useConnection } from "../hooks/useConnection";
import React from "react";

type Props = {
  // title: string;
  children: JSX.Element | JSX.Element[] | null;
};

export function LoveShackStake({ children }: Props) {
  const keys = usePublicKeys();
  const { publicKey } = useWallet();
  const connection = useConnection();
  const { tokenAccounts, getTokenAccounts } = useTokenAccounts();
  const {
    stakingAcctInfo,
    stakingAcct,
    holdingAcct,
    lsProgram,
    getStakingAcctInfo,
  } = useLoveshack();
  const lsStaking = useDinoStakingCard();
  const [isStakingModalVisible, setIsStakingModalVisible] =
    useState<boolean>(false);
  const [isStake, setIsStake] = useState<boolean>(true);

  const stakeDino = async (amount: number) => {
    if (
      connection &&
      tokenAccounts &&
      publicKey &&
      lsProgram &&
      stakingAcct &&
      holdingAcct
    ) {
      const accounts = tokenAccounts[DINO_MINT.toString()];
      let instructions: TransactionInstruction[] = [];

      if (accounts.length > 1) {
        // handle that shit
      }

      if (!stakingAcctInfo) {
        utils.createStakingAccountInstruction(
          instructions,
          lsProgram,
          publicKey,
          stakingAcct
        );
      }

      utils.createStakeDinoInstruction(
        instructions,
        lsProgram,
        publicKey,
        accounts[0].pubkey,
        stakingAcct,
        holdingAcct,
        amount,
        6
      );

      const transaction = await utils.generateTransaction(
        connection,
        publicKey,
        instructions
      );

      let tx = undefined;

      try {
        tx = await utils.solanaSignAndConfirmTransaction(transaction);
        if (!tx) {
          throw Error();
        }
      } catch (error) {
        return;
        // handle error
      }
      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: tx,
        },
        "confirmed"
      );

      getStakingAcctInfo(stakingAcct, lsProgram);
      getTokenAccounts(publicKey, connection);

      // utils.createStakeDinoInstruction()
    }
  };

  const unStakeDino = async (amount: number) => {
    if (
      connection &&
      tokenAccounts &&
      publicKey &&
      lsProgram &&
      stakingAcct &&
      holdingAcct
    ) {
      const accounts = tokenAccounts[DINO_MINT.toString()];
      let instructions: TransactionInstruction[] = [];

      if (accounts.length > 1) {
        // handle that shit
      }

      if (!stakingAcctInfo) {
        // throw error
      }

      utils.getStakeDinoInstruction(
        instructions,
        lsProgram,
        publicKey,
        accounts[0].pubkey,
        stakingAcct,
        holdingAcct,
        amount,
        6
      );

      const transaction = await utils.generateTransaction(
        connection,
        publicKey,
        instructions
      );

      let tx = undefined;

      try {
        tx = await utils.solanaSignAndConfirmTransaction(transaction);
        if (!tx) {
          throw Error();
        }
      } catch (error) {
        return;
        // handle error
      }
      const latestBlockHash = await connection.getLatestBlockhash();

      await connection.confirmTransaction(
        {
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: tx,
        },
        "confirmed"
      );

      getStakingAcctInfo(stakingAcct, lsProgram);
      getTokenAccounts(publicKey, connection);

      // utils.createStakeDinoInstruction()
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isStakingModalVisible}
      >
        <LoveShackModal
          stakedBalance={lsStaking.stakedMintABalance}
          walletBalance={lsStaking.unstakedMintABalance}
          children={null}
          closeModal={() => setIsStakingModalVisible(!isStakingModalVisible)}
          isStake={isStake}
          handleStake={(amount: number) => stakeDino(amount)}
          handleUnstake={(amount: number) => unStakeDino(amount)}
        ></LoveShackModal>
      </Modal>

      <View style={styles.heading}>
        <Image
          style={styles.logo}
          alt="testing"
          source={require("../assets/dino_logo.png")}
        />
        <View style={styles.titleSection}>
          <Text style={[styles.typography, styles.title]}>
            Love Shack DINO pool
          </Text>
          <Text style={styles.typography}>
            Your stake:{" "}
            {utils.numberWithSpaces(
              lsStaking.stakedMintABalance?.toString() ?? "0"
            )}{" "}
            DINO
          </Text>
        </View>
      </View>

      <View style={styles.description}>
        <View style={styles.descriptionRow}>
          <Text style={styles.typography}>Link to DINO Dex:</Text>
          <Text style={styles.typography}>click here</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.typography}>Estimated DINOEGG per month:</Text>
          <Text style={styles.typography}>{lsStaking.estimatedMintBEarn}</Text>
        </View>
        <View style={styles.descriptionRow}>
          <Text style={styles.typography}>Wallet balance:</Text>
          <Text style={styles.typography}>
            {utils.numberWithSpaces(
              lsStaking.unstakedMintABalance?.toString() ?? "0"
            )}{" "}
            DINO
          </Text>
        </View>

        <ProgressBar
          width={null}
          style={styles.progressBar}
          borderWidth={0}
          unfilledColor="rgba(255, 255, 255, 0.08)"
          progress={0}
          color={"#7792F0"}
        />

        <View style={styles.descriptionRow}>
          <Text style={styles.typography}>Pool size:</Text>
          <Text style={styles.typography}>{lsStaking.mintAPoolSize} DINO</Text>
        </View>
      </View>
      <View style={styles.buttonSection}>
        <View style={styles.buttonSectionItem}>
          <PrimaryButton
            title={"Stake"}
            onPress={() => {
              setIsStake(true);
              setIsStakingModalVisible(true);
            }}
          />
        </View>
        <View style={styles.buttonSectionItem}>
          <PrimaryButton
            title={"Unstake"}
            onPress={() => {
              setIsStake(false);
              setIsStakingModalVisible(true);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  typography: {
    color: "rgba(255, 255, 255, 0.85)",
  },
  container: {
    position: "relative",
    padding: "10px",
    backgroundColor: "rgb(50, 54, 61)",
    borderRadius: 15,
    fontSize: 14,
    fontWeight: "400",
  },
  heading: {
    backgroundColor:
      "linear-gradient(rgb(126, 128, 212) 0%, rgb(153, 99, 212) 100%)",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 3px 3px 2px",
    padding: "10px",
    borderRadius: 14,
    heigh: "78px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 15,
  },
  titleSection: {
    display: "flex",
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
  },
  logo: {
    height: "64px",
    width: "45px",
  },
  description: {
    paddingTop: "22px",
    paddingHorizontal: "15px",
    gap: 6,
  },
  descriptionRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    marginVertical: "8px",
  },
  buttonSection: {
    marginVertical: 20,
    display: "flex",
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  buttonSectionItem: {
    maxWidth: "47%",
    width: "100%",
  },
});
