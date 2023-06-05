import { Connection, PublicKey, TokenAmount } from "@solana/web3.js";
import { LOVE_SHACK_IDL } from "../idls/loveshackIdl";
import { Buffer } from "buffer";
import { DINO_MINT, EGG_MINT, LS_PROGRAM_ID } from "../consts";
import { useEffect, useState } from "react";
import { useConnection } from "./useConnection";
import { useWallet } from "./useWallet";
import { atom, useRecoilState } from "recoil";
import { Program } from "@coral-xyz/anchor";

const stakingAcctInfoAtom = atom<any>({
  key: "stakingAcctInfoAtom",
  default: undefined,
});

export function useLoveshack() {
  const wallet = useWallet();
  const connection = useConnection();
  const [holdingAcct, setHoldingAcct] = useState<PublicKey>();
  const [authAcct, setAuthAcct] = useState<PublicKey>();
  const [stakingAcct, setStakingAcct] = useState<PublicKey>();
  const [stakingAcctInfo, setStakingAcctInfo] =
    useRecoilState(stakingAcctInfoAtom);
  const [lsProgram, setLsProgram] = useState<Program>();
  const [poolAmount, setPoolAmount] = useState<TokenAmount>();

  useEffect(() => {
    if (wallet.provider && connection) {
      setLsProgram(new Program(LOVE_SHACK_IDL, LS_PROGRAM_ID, wallet.provider));
    }
  }, [wallet.provider, connection, setLsProgram]);

  useEffect(() => {
    if (lsProgram && (!holdingAcct || !authAcct)) {
      setHoldingAcct(
        PublicKey.findProgramAddressSync(
          [Buffer.from("holding"), DINO_MINT.toBuffer()],
          lsProgram.programId
        )[0]
      );

      setAuthAcct(
        PublicKey.findProgramAddressSync(
          [Buffer.from("minting"), EGG_MINT.toBuffer()],
          lsProgram.programId
        )[0]
      );
    }
  }, [lsProgram, holdingAcct, authAcct, setHoldingAcct, setAuthAcct]);

  useEffect(() => {
    if (lsProgram && wallet.publicKey) {
      const _stakeAcct = PublicKey.findProgramAddressSync(
        [
          wallet.publicKey.toBuffer(),
          EGG_MINT.toBuffer(),
          DINO_MINT.toBuffer(),
        ],
        LS_PROGRAM_ID
      )[0];
      setStakingAcct(_stakeAcct);

      getStakingAcctInfo(_stakeAcct, lsProgram);
    }
  }, [lsProgram, wallet.publicKey, setStakingAcct]);

  useEffect(() => {
    if (holdingAcct && connection) {
      getPoolBalance(holdingAcct, connection);
    }
  }, [holdingAcct, connection]);

  const getPoolBalance = async (
    _holdingAcct: PublicKey,
    _connection: Connection
  ) => {
    setPoolAmount(
      (await _connection.getTokenAccountBalance(_holdingAcct)).value
    );
  };

  const getStakingAcctInfo = async (
    _stakingAcct: PublicKey,
    _lsProgram: Program
  ) => {
    setStakingAcctInfo(
      await _lsProgram.account?.stakeAccountV2
        .fetch(_stakingAcct, "confirmed")
        .catch((error) => undefined)
    );
  };

  return {
    holdingAcct,
    authAcct,
    stakingAcct,
    stakingAcctInfo,
    getStakingAcctInfo,
    lsProgram,
    poolAmount,
  };
}
