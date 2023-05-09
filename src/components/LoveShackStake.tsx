import { StyleSheet, Text, View, Image } from "react-native";
import { Bar as ProgressBar } from "react-native-progress";
import { useLoveshack } from "../hooks/useLoveshack";
import { usePublicKeys, useSolanaConnection } from "../hooks/xnft-hooks";
import { useTokenBalances } from "../hooks/useTokenBalances";
import { useDinoStakingCard } from "../hooks/useDinoStakingCard";
import * as utils from "../utils";

type Props = {
  // title: string;
  children: JSX.Element | JSX.Element[] | null;
};

export function LoveShackStake({ children }: Props) {
  const keys = usePublicKeys();
  const conn = useSolanaConnection();
  const lsStaking = useDinoStakingCard();

  return (
    <View style={styles.container}>
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
          <Text style={styles.typography}>
            Estimated DINOEGG earned per month:
          </Text>
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
        <View>
          {/* <PrimaryButton
            title={"Testing"}
            onPress={() => {}}
            children={null}
          ></PrimaryButton> */}
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
  example: {
    marginTop: 8,
  },
});
