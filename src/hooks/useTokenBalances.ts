import { useEffect, useState } from "react";
import { useTokenAccounts } from "./useTokenAccounts";

export function useTokenBalances() {
  const { tokenAccounts } = useTokenAccounts();
  const [tokenBalances, setTokenBalances] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (tokenAccounts) {
      const _tokenBalances: {
        [key: string]: number;
      } = {};
      Object.keys(tokenAccounts).forEach((key: string) => {
        _tokenBalances[key] = tokenAccounts[key]
          .map(
            (value) =>
              (value.account.data.parsed?.info?.tokenAmount
                ?.uiAmount as number) ?? 0
          )
          .reduce((partialSum, a) => partialSum + a, 0);
      });

      setTokenBalances(_tokenBalances);
    }
  }, [tokenAccounts]);

  return { tokenBalances };
}
