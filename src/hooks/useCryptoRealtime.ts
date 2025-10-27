import { useEffect } from "react";
import { useCryptoStore } from "@/store/useCryptoStore";

import type { Crypto } from "@/types/crypto";

export const useCryptoRealtime = () => {
  const { cryptos, setCryptos } = useCryptoStore();

  useEffect(() => {
    const assetIds = ["bitcoin", "ethereum", "solana", "dogecoin"];

    const ws = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${assetIds.join(",")}`
    );

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(data);
        setCryptos(
          assetIds.map((id) => {
            const existing = cryptos.find((c: Crypto) => c.id === id);
            const priceUsd = data[id]
              ? parseFloat(data[id])
              : existing?.priceUsd ?? 0;

            return {
              id,
              name: existing?.name ?? id.charAt(0).toUpperCase() + id.slice(1), // Capitalize name if missing
              priceUsd,
              changePercent24Hr: existing?.changePercent24Hr ?? 0,
              volumeUsd24Hr: existing?.volumeUsd24Hr ?? 0,
              statusText: "Live", // example: could be "Live" or "Disconnected"
            };
          })
        );
      } catch (error) {
        console.error("Error parsing CoinCap WebSocket data:", error);
      }
    };

    ws.onclose = () => {
      console.warn("CoinCap WebSocket disconnected");
    };

    return () => ws.close();
  }, [cryptos, setCryptos]);
};
