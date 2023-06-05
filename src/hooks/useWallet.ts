import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { AnchorProvider, Provider } from "@coral-xyz/anchor";
import { useConnection } from "./useConnection";
import { XnftWallet } from "../models/xnft-types";

export function useWallet() {
  const [solanaPublicKey, setSolanaPublicKey] = useState<PublicKey>();
  const [provider, setProvider] = useState<Provider>();
  const connection = useConnection();

  useEffect(() => {
    if (connection) {
      setProvider(
        new AnchorProvider(
          connection,
          new XnftWallet(window.xnft.solana),
          AnchorProvider.defaultOptions()
        )
      );
    }
  }, [connection, setProvider]);

  useEffect(() => {
    if (window?.xnft?.publicKeys?.solana) {
      const key = window?.xnft?.publicKeys?.solana;
      setSolanaPublicKey(new PublicKey(key));
    }
  }, [window?.xnft?.publicKeys?.solana, setSolanaPublicKey]);
  return {
    publicKey: solanaPublicKey,
    provider,
  };
}
