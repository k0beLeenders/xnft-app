import { DINO_MINT, EGG_MINT } from "../consts";
import { useLoveshack } from "./useLoveshack";
import { useTokenBalances } from "./useTokenBalances";
import * as utils from "../utils";

export function useDinoStakingCard() {
  const { stakingAcctInfo, poolAmount } = useLoveshack();
  const { tokenBalances } = useTokenBalances();

  const balanceDino = tokenBalances[DINO_MINT.toString()];
  const balanceEgg = tokenBalances[EGG_MINT.toString()];
  const rateDiv = 1;
  const rate = 2_500_000 * 100_000;

  const estimatedMintBEarn = stakingAcctInfo
    ? utils
        .setDecimal(
          utils.calculateEstimatedEarnEgg30(
            stakingAcctInfo,
            rate,
            rateDiv,
            stakingAcctInfo.dinoMintStaked
          ),
          6
        )
        .toFixed(6)
        .toString()
    : "-";

  const earnedMintBBalance = stakingAcctInfo
    ? utils
        .setDecimal(
          utils.calculateDinoEarnedEggConstant(
            stakingAcctInfo,
            rate,
            rateDiv,
            stakingAcctInfo.bMintEarnedFromDino,
            stakingAcctInfo.dinoMintStaked
          ),
          6
        )
        .toFixed(6)
        .toString()
    : "-";

  //TODO dynamic!
  const currentEarningRate = "1 DINOEGG / 300k DINO / 30 days";

  const dinoStake = stakingAcctInfo?.dinoMintStaked
    ? stakingAcctInfo.dinoMintStaked.toNumber() / 1000000
    : 0;

  return {
    unstakedMintABalance: balanceDino,
    stakedMintABalance: dinoStake,
    estimatedMintBStakeTime: "-",
    claimedMintBBalance: balanceEgg?.toString(),
    earnedMintBBalance: earnedMintBBalance,
    mintAPoolSize: utils.numberWithSpaces(
      poolAmount?.uiAmount?.toFixed() ?? "0"
    ),
    stakedMintAPercentage: (dinoStake / (dinoStake + balanceDino)) * 100,
    currentEarningRate: currentEarningRate,
    estimatedMintBEarn: estimatedMintBEarn,
  };
}
