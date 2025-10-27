import { create } from "zustand";
import type { Crypto } from "@/types/crypto";
import { cryptoCoins } from "@/components/Mocks/crypto-coins";

interface CryptoState {
  cryptos: Crypto[];
  setCryptos: (data: Crypto[]) => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  cryptos: cryptoCoins,
  setCryptos: (data) => set({ cryptos: data }),
}));
