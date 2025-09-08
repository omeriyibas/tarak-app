// src/lib/storageAdapter.ts
type StorageLike = {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
};

// Ortam kontrolü (React Native / Browser / Node)
const isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

// ---- Fallback: Node/test ortamı için in-memory storage
const memory = new Map<string, string>();
const memoryAdapter: StorageLike = {
    async getItem(k) { return memory.get(k) ?? null; },
    async setItem(k, v) { memory.set(k, v); },
    async removeItem(k) { memory.delete(k); },
};

// ---- Browser için localStorage adapter
const webAdapter: StorageLike = {
    async getItem(k) { return window.localStorage.getItem(k); },
    async setItem(k, v) { window.localStorage.setItem(k, v); },
    async removeItem(k) { window.localStorage.removeItem(k); },
};

// ---- Native için SecureStore (dinamik require: Node’da yüklenmez)
const secureAdapter: StorageLike = (() => {
    try {
        // Bu require sadece React Native’de başarılı olur
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const SecureStore = require("expo-secure-store");
        return {
            async getItem(k) { return (await SecureStore.getItemAsync(k)); },
            async setItem(k, v) { await SecureStore.setItemAsync(k, v); },
            async removeItem(k) { await SecureStore.deleteItemAsync(k); },
        } as StorageLike;
    } catch {
        // Native değilse buraya düşer
        return memoryAdapter;
    }
})();

// ---- Akıllı seçim
export const storage: StorageLike =
    isReactNative ? secureAdapter :
        isBrowser ? webAdapter :
            memoryAdapter;
