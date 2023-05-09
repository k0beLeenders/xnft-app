import { Connection, PublicKey, TokenAmount } from "@solana/web3.js";
import { LOVE_SHACK_IDL } from "../idls/loveshackIdl";
import { usePublicKeys, useSolanaConnection } from "./xnft-hooks";
import { Buffer } from "buffer";
import {
  Provider,
  Program,
  Wallet,
  AnchorProvider,
} from "@project-serum/anchor";
import { DINO_MINT, EGG_MINT, LS_PROGRAM_ID } from "../consts";
import { useEffect, useState } from "react";

export function useLoveshack() {
  const solanaPublicKey: PublicKey | undefined = new PublicKey(
    window.xnft.publicKeys?.solana ?? PublicKey.default.toString()
  ); // replace with hook eventually
  const connection: Connection | undefined = window.xnft.solana?.connection; // replace with hook eventually
  const [holdingAcct, setHoldingAcct] = useState<PublicKey>();
  const [authAcct, setAuthAcct] = useState<PublicKey>();
  const [stakingAcct, setStakingAcct] = useState<PublicKey>();
  const [stakingAcctInfo, setStakingAcctInfo] = useState<any>();
  const [lsProgram, setLsProgram] = useState<Program>();
  const [poolAmount, setPoolAmount] = useState<TokenAmount>();

  useEffect(() => {
    if (solanaPublicKey && connection) {
      const hackyWallet = {
        publicKey: solanaPublicKey,
      } as Wallet;

      // console.log({ connection });

      // const provider = new AnchorProvider(connection, hackyWallet, {});
      // setLsProgram(new Program(LOVE_SHACK_IDL, LS_PROGRAM_ID, provider));
    }
  }, [solanaPublicKey, connection]);

  // useEffect(() => {
  //   if (lsProgram && (!holdingAcct || !authAcct)) {
  //     setHoldingAcct(
  //       PublicKey.findProgramAddressSync(
  //         [Buffer.from("holding"), DINO_MINT.toBuffer()],
  //         lsProgram.programId
  //       )[0]
  //     );

  //     setAuthAcct(
  //       PublicKey.findProgramAddressSync(
  //         [Buffer.from("minting"), EGG_MINT.toBuffer()],
  //         lsProgram.programId
  //       )[0]
  //     );
  //   }
  // }, [lsProgram]);

  // useEffect(() => {
  //   if (lsProgram && solanaPublicKey) {
  //     const _stakeAcct = PublicKey.findProgramAddressSync(
  //       [solanaPublicKey.toBuffer(), EGG_MINT.toBuffer(), DINO_MINT.toBuffer()],
  //       LS_PROGRAM_ID
  //     )[0];
  //     setStakingAcct(_stakeAcct);

  //     getStakingAcctInfo(_stakeAcct, lsProgram);
  //   }
  // }, [lsProgram, solanaPublicKey]);

  // useEffect(() => {
  //   if (holdingAcct && connection) {
  //     getPoolBalance(holdingAcct, connection);
  //   }
  // }, [holdingAcct]);

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
        .fetch(_stakingAcct)
        .catch((error) => undefined)
    );
  };

  return {
    holdingAcct,
    authAcct,
    stakingAcct,
    stakingAcctInfo,
    lsProgram,
    poolAmount,
  };
}
