import { createAssociatedTokenAccountInstruction } from "@solana/spl-token";

import { PublicKey, TransactionInstruction } from "@solana/web3.js";
// import BN from "bn.js";
import { Program, BN } from "@coral-xyz/anchor";
import { DINO_MINT, EGG_MINT } from "../consts";

export const SYSTEM_PROGRAM_ID = new PublicKey(
  "11111111111111111111111111111111"
);

export const CLOCK_PROGRAM_ID = new PublicKey(
  "SysvarC1ock11111111111111111111111111111111"
);

export const RENT_PROGRAM_ID = new PublicKey(
  "SysvarRent111111111111111111111111111111111"
);
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
export let TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export function calculateDinoEarnedEggConstant(
  stakingAcctInfo: any,
  rate: number,
  rateDiv: number,
  bMintEarned: any,
  aMintStaked: any
): number {
  var TIME_NOW = Math.round(Date.now() / 1000);
  const CONST_RATE = rate * Math.pow(3, 1);

  const elapsedStakingTime =
    TIME_NOW - stakingAcctInfo.currentStakeUnixTimestamp.toNumber();
  const alreadyEarnedEgg = bMintEarned ? bMintEarned.toNumber() : 0; // Already earned Egg

  var curEarningEgg = 0;

  curEarningEgg += (aMintStaked * elapsedStakingTime * rateDiv) / CONST_RATE; // Calculate remaing egg

  if (0 > alreadyEarnedEgg + curEarningEgg) {
    return 0;
  }

  return alreadyEarnedEgg + curEarningEgg;
}

export function calculateDinoEarnedEgg(
  stakingAcctInfo: any,
  rate: number,
  rateDiv: number,
  bMintEarned: any,
  aMintStaked: any
): number {
  const DINO_EGG_BEGIN = 1626912000;
  var TIME_NOW = Math.round(Date.now() / 1000);
  const DINO_EGG_THIRD = 66 * 24 * 60 * 60;
  const INIT_RATE = rate * Math.pow(3, 0);

  const alreadyEarnedEgg = bMintEarned ? bMintEarned.toNumber() : 0; // Already earned Egg

  const eggTimeStartStake =
    stakingAcctInfo.currentStakeUnixTimestamp.toNumber() - DINO_EGG_BEGIN; // Staking start time - beginning of egg generation
  const eggTimeNow = TIME_NOW - DINO_EGG_BEGIN; // Time now on egg timeline scale

  var passed = Math.trunc(eggTimeStartStake / DINO_EGG_THIRD); // How many 'thirdenings' proceeded the initial staking start

  var rate = INIT_RATE * Math.pow(3, passed); // Define initial rate at the time of the staking start date
  var curEarningEgg = 0;
  var eggTimeStakeInt = eggTimeStartStake;
  var eggTimeStart = eggTimeStartStake;

  while (DINO_EGG_THIRD * (passed + 1) < eggTimeNow) {
    // While time now on eggtimeline is after the next 'thirdening' we can calulate the earned egg for a whole period with a constant rate
    const current = DINO_EGG_THIRD * (passed + 1);
    const remain = current - eggTimeStakeInt;

    curEarningEgg += (aMintStaked * remain) / rate;
    eggTimeStakeInt = current;
    eggTimeStart = DINO_EGG_THIRD * (passed + 1);
    passed = Math.trunc(eggTimeStakeInt / DINO_EGG_THIRD);
    rate = INIT_RATE * Math.pow(3, passed);
  }

  const remain = eggTimeNow - eggTimeStart;
  curEarningEgg += (aMintStaked * remain * rateDiv) / rate; // Calculate remaing egg

  if (0 > alreadyEarnedEgg + curEarningEgg) {
    return 0;
  }

  return alreadyEarnedEgg + curEarningEgg;
}

export function calculateEstimatedEarnEgg30(
  stakingAcctInfo: any,
  rate: number,
  rateDiv: number,
  aMintStaked: any
): number {
  const CONST_RATE = rate * Math.pow(3, 1);
  const period = 30 * 24 * 60 * 60;

  const curEarningEgg = (aMintStaked * period * rateDiv) / CONST_RATE;

  // curEarningEgg = (aMintStaked * timeRemainingInPeriod * rateDiv) / rate;

  return curEarningEgg;
}

export function calculateEstimatedEarnEgg(
  stakingAcctInfo: any,
  rate: number,
  rateDiv: number,
  aMintStaked: any
): number {
  const DINO_EGG_BEGIN = 1626912000;
  var TIME_NOW = Math.round(Date.now() / 1000);
  const DINO_EGG_THIRD = 66 * 24 * 60 * 60;
  const INIT_RATE = rate * Math.pow(3, 0);

  const eggTimeNow = TIME_NOW - DINO_EGG_BEGIN; // Time now on egg timeline scale

  var passed = Math.trunc(eggTimeNow / DINO_EGG_THIRD); // How many 'thirdenings' proceeded the current time
  var rate = INIT_RATE * Math.pow(3, passed); // Define initial rate at the time of the staking start date
  var curEarningEgg = 0;

  const current = DINO_EGG_THIRD * (passed + 1);
  const remain = current - eggTimeNow;

  curEarningEgg = (aMintStaked * remain * rateDiv) / rate;

  // curEarningEgg = (aMintStaked * timeRemainingInPeriod * rateDiv) / rate;

  return curEarningEgg;
}

export function checkTriceratopsBonus(stakeAcctInfo: any): boolean {
  const dinoStake = stakeAcctInfo?.dinoMintStaked
    ? stakeAcctInfo.dinoMintStaked.toNumber() / 1000000
    : 0;

  const rayStake = stakeAcctInfo?.raydiumLpMintStaked
    ? stakeAcctInfo.raydiumLpMintStaked.toNumber() / 1000000
    : 0;

  const stepStake = stakeAcctInfo?.stepLpMintStaked
    ? stakeAcctInfo.stepLpMintStaked.toNumber() / 1000000
    : 0;

  const dinoValue = dinoStake > 0 ? true : false;
  const rayValue = rayStake > 0 ? true : false;
  const stepValue = stepStake > 0 ? true : false;

  if (dinoValue && rayValue && stepValue) {
    return true;
  }

  return false;
}

export function checkCalibrationBonus(stakeAcctInfo: any): boolean {
  const dinoTimeStamp =
    stakeAcctInfo?.currentStakeUnixTimestamp?.toNumber() ?? 1626912000;
  var TIME_NOW = Math.round(Date.now() / 1000);

  const difference = (TIME_NOW - dinoTimeStamp) / 3600;
  if (difference > 38) {
    return false;
  }
  return true;
}

export function calculateResearchDaysLeft(): string {
  const DINO_EGG_BEGIN = 1626912000;
  var TIME_NOW = Math.round(Date.now() / 1000);
  const DINO_EGG_THIRD = 66 * 24 * 60 * 60;

  const eggTimeNow = TIME_NOW - DINO_EGG_BEGIN; // Time now on egg timeline scale

  var passed = Math.trunc(eggTimeNow / DINO_EGG_THIRD); // How many 'thirdenings' proceeded the current time

  const current = DINO_EGG_THIRD * (passed + 1);
  const remain = current - eggTimeNow;

  return Math.floor(remain / (3600 * 24)).toFixed(0);
}

export function setDecimal(amount: number, decimals?: number): number {
  return amount / Math.pow(10, decimals ? decimals : 0);
}

export function numberWithCommas(value: string) {
  var parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export function numberWithSpaces(value: string) {
  var parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export function createStakingAccountInstruction(
  instructions: TransactionInstruction[],
  program: Program,
  owner: PublicKey,
  stakeAcct: PublicKey
) {
  instructions.push(
    program.instruction.initStakingAccountsV2({
      accounts: {
        owner: owner,
        aMint: DINO_MINT,
        bMint: EGG_MINT,
        stakeV2: stakeAcct,
        rent: RENT_PROGRAM_ID,
        systemProgram: SYSTEM_PROGRAM_ID,
      },
    })
  );
  return;
}

export function createAtaInstruction(
  instructions: TransactionInstruction[],
  ata: PublicKey,
  owner: PublicKey,
  mint: PublicKey
) {
  instructions.push(
    createAssociatedTokenAccountInstruction(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint,
      ata,
      owner,
      owner
    )
  );
}

export function createStakeDinoInstruction(
  instructions: TransactionInstruction[],
  program: Program,
  owner: PublicKey,
  ataDino: PublicKey,
  stakeAcct: PublicKey,
  holdingAcct: PublicKey,
  amount: number,
  decimals: number
) {
  const amountBn = new BN(amount * Math.pow(10, decimals));

  instructions.push(
    program.instruction.putStakeDinoForEgg(amountBn, {
      accounts: {
        owner: owner,
        aMint: DINO_MINT,
        bMint: EGG_MINT,
        from: ataDino,
        stake: stakeAcct,
        holding: holdingAcct,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: RENT_PROGRAM_ID,
        clock: CLOCK_PROGRAM_ID,
        systemProgram: SYSTEM_PROGRAM_ID,
      },
    })
  );
  return;
}

export function getStakeDinoInstruction(
  instructions: TransactionInstruction[],
  program: Program,
  owner: PublicKey,
  ata: PublicKey,
  stakeAcct: PublicKey,
  holdingAcct: PublicKey,
  amount: number,
  decimals: number
) {
  instructions.push(
    program.instruction.getStakeDinoForEgg(
      new BN(amount * Math.pow(10, decimals)),
      {
        accounts: {
          owner: owner,
          aMint: DINO_MINT,
          bMint: EGG_MINT,
          to: ata,
          stake: stakeAcct,
          holding: holdingAcct,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: RENT_PROGRAM_ID,
          clock: CLOCK_PROGRAM_ID,
          systemProgram: SYSTEM_PROGRAM_ID,
        },
      }
    )
  );
  return;
}

export function claimEggInstruction(
  instructions: TransactionInstruction[],
  program: Program,
  owner: PublicKey,
  ataEgg: PublicKey,
  stakeAcct: PublicKey,
  eggAuthAcct: PublicKey
) {
  instructions.push(
    program.instruction.claimEggFromDino({
      accounts: {
        owner: owner,
        aMint: DINO_MINT,
        bMint: EGG_MINT,
        to: ataEgg,
        stake: stakeAcct,
        authority: eggAuthAcct,
        tokenProgram: TOKEN_PROGRAM_ID,
        rent: RENT_PROGRAM_ID,
        clock: CLOCK_PROGRAM_ID,
        systemProgram: SYSTEM_PROGRAM_ID,
      },
    })
  );
  return;
}
