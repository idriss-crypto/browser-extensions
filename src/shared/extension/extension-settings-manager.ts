import { DEFAULT_EXTENSION_SETTINGS, SETTINGS_STORAGE_KEY } from './constants';
import { ExtensionSettings, NewMarketMinified, StoredWallet } from './types';

export const ExtensionSettingsManager = {
  getAllSettings(): Promise<ExtensionSettings> {
    return new Promise((resolve) => {
      void chrome.storage.local.get([SETTINGS_STORAGE_KEY]).then((result) => {
        return resolve(
          result[SETTINGS_STORAGE_KEY] ?? DEFAULT_EXTENSION_SETTINGS,
        );
      });
    });
  },

  setSettings(settings: ExtensionSettings) {
    return chrome.storage.local.set({ [SETTINGS_STORAGE_KEY]: settings });
  },

  // TODO: move the wallet to a separate manager
  saveWallet(wallet: StoredWallet) {
    return chrome.storage.local.set({
      'idriss-wallet': JSON.stringify(wallet),
    });
  },

  clearWallet() {
    return chrome.storage.local.remove('idriss-wallet');
  },

  getWallet(): Promise<StoredWallet | undefined> {
    return new Promise((resolve) => {
      void chrome.storage.local.get('idriss-wallet').then((storedWalletRaw) => {
        const storedWallet = storedWalletRaw['idriss-wallet']
          ? (JSON.parse(storedWalletRaw['idriss-wallet']) as StoredWallet)
          : undefined;
        return resolve(storedWallet);
      });
    });
  },
  
  saveLatestMarkets(markets: NewMarketMinified[]) {
    const now = new Date();
    const filteredMarkets = markets.filter((market) => {
      const startDate = new Date(market.startDate);
      const endDate = new Date(market.endDate);
      return startDate <= now && now <= endDate;
    });

    return chrome.storage.local.set({
      latestMarkets: filteredMarkets,
    });
  },

  chromeStorageGet(keys: string[]): Promise<Record<string, string[] | number | NewMarketMinified[]>> {
    return new Promise((resolve) => {
      chrome.storage.local.get(keys, (result) => {
          resolve(result);
      });
    });
  },

  chromeStorageSet(items: Record<string,  string[] | number | NewMarketMinified[]>): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set(items, () => {
          resolve();
      });
    });
  },

  async getNextMarketToDisplay(): Promise<NewMarketMinified | undefined> {
    const lastDisplayed = await this.getLastDisplayedTime();
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
  
    if (now - lastDisplayed < fiveMinutes) {
      return;
    }
  
    const result = await this.chromeStorageGet(['latestMarkets']);
    const markets: NewMarketMinified[] = result.latestMarkets as NewMarketMinified[];
  
    while (markets.length > 0) {
      const market = markets.shift();
      if(!market) return;
  
      await this.chromeStorageSet({ latestMarkets: markets });
  
      const alreadyDisplayed = await this.wasMarketDisplayed(market.conditionId);
      if (!alreadyDisplayed) {
        await this.markMarketAsDisplayed(market.conditionId);
        await this.updateLastDisplayedTime();
        return market;
      }
    }
  
    return;
  },

  async getDisplayedMarketIds(): Promise<string[]> {
    const result = await this.chromeStorageGet(['displayedMarketIds']);
    return result.displayedMarketIds as string[];
  },

  async markMarketAsDisplayed(marketId: string): Promise<void> {
    const displayedMarketIds = await this.getDisplayedMarketIds();
    displayedMarketIds.push(marketId);

    const maxIds = 30;
    const updatedDisplayedMarketIds = displayedMarketIds.slice(-maxIds);

    await this.chromeStorageSet({ displayedMarketIds: updatedDisplayedMarketIds });
  },

  async wasMarketDisplayed(marketId: string): Promise<boolean> {
    const displayedMarketIds = await this.getDisplayedMarketIds();
    return displayedMarketIds.includes(marketId);
  },

  async getLastDisplayedTime(): Promise<number> {
    const result = await this.chromeStorageGet(['lastDisplayed']);
    const lastDisplayed = result.lastDisplayed as number;
    return lastDisplayed ?? 0;
  },

  async updateLastDisplayedTime(): Promise<void> {
    const now = Date.now();
    await this.chromeStorageSet({ lastDisplayed: now });
  }

};
