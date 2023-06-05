import {
  Connection,
  PublicKey,
  AccountInfo,
  ParsedAccountData,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import { DINO_MINT, EGG_MINT } from "../consts";
import { useWallet } from "./useWallet";
import { useConnection } from "./useConnection";

interface ITokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}

export function useTokenAccounts() {
  const wallet = useWallet();
  const connection = useConnection();

  const [tokenAccounts, setTokenAcccounts] = useState<{
    [key: string]: ITokenAccount[];
  }>();

  useEffect(() => {
    if (wallet.publicKey && connection) {
      getTokenAccounts(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection]);

  const getTokenAccounts = async (
    owner: PublicKey,
    _connection: Connection
  ) => {
    let _tokenAccounts: {
      [key: string]: ITokenAccount[];
    } = {};

    const dinoAccounts = (
      await _connection.getParsedTokenAccountsByOwner(
        owner,
        {
          mint: DINO_MINT,
        },
        "confirmed"
      )
    ).value;

    _tokenAccounts[DINO_MINT.toString()] = dinoAccounts;

    const eggAccounts = (
      await _connection.getParsedTokenAccountsByOwner(
        owner,
        {
          mint: EGG_MINT,
        },
        "confirmed"
      )
    ).value;

    _tokenAccounts[EGG_MINT.toString()] = eggAccounts;

    setTokenAcccounts(_tokenAccounts);
  };

  return { tokenAccounts, getTokenAccounts };
}
