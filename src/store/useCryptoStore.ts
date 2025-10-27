import { create } from "zustand";
import type { Crypto } from "@/types/crypto";

interface CryptoState {
  cryptos: Crypto[];
  setCryptos: (data: Crypto[]) => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  cryptos: [],
  setCryptos: (data) => set({ cryptos: data }),
}));
