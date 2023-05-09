import {
  Connection,
  PublicKey,
  AccountInfo,
  ParsedAccountData,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import { DINO_MINT, EGG_MINT } from "../consts";

interface ITokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}

export function useTokenAccounts() {
  const solanaPublicKey: PublicKey | undefined = new PublicKey(
    window.xnft.publicKeys?.solana ?? PublicKey.default.toString()
  ); // replace with hook eventually
  const connection: Connection | undefined = window.xnft.solana?.connection; // replace with hook eventually

  const [tokenAccounts, setTokenAcccounts] = useState<{
    [key: string]: ITokenAccount[];
  }>();

  useEffect(() => {
    if (solanaPublicKey && connection) {
      getTokenAccounts(solanaPublicKey, connection);
    }
  }, [solanaPublicKey, connection]);

  const getTokenAccounts = async (
    owner: PublicKey,
    _connection: Connection
  ) => {
    let _tokenAccounts: {
      [key: string]: ITokenAccount[];
    } = {};

    const dinoAccounts = (
      await _connection.getParsedTokenAccountsByOwner(owner, {
        mint: DINO_MINT,
      })
    ).value;

    _tokenAccounts[DINO_MINT.toString()] = dinoAccounts;

    const eggAccounts = (
      await _connection.getParsedTokenAccountsByOwner(owner, {
        mint: EGG_MINT,
      })
    ).value;

    _tokenAccounts[EGG_MINT.toString()] = eggAccounts;

    setTokenAcccounts(_tokenAccounts);
  };

  return { tokenAccounts };
}
