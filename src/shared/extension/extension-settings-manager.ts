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

  async saveLatestMarkets(
    markets: NewMarketMinified[],
  ): Promise<{ latestMarkets: NewMarketMinified[] }> {
    const now = Math.floor(Date.now() / 1000);
    const filteredMarkets = markets.filter((market) => {
      return market.startDate <= now && now <= market.endDate;
    });

    const [existingMarkets, displayedMarkets] = await Promise.all([
      this.getLatestMarkets(),
      this.getDisplayedMarkets(),
    ]);

    const existingConditionIds = new Set(
      existingMarkets.map((m) => {
        return m.conditionId;
      }),
    );
    const displayedConditionIds = new Set(displayedMarkets);

    const newUniqueMarkets = filteredMarkets.filter((m) => {
      return (
        !existingConditionIds.has(m.conditionId) &&
        !displayedConditionIds.has(m.conditionId)
      );
    });

    let mergedMarkets = [...existingMarkets, ...newUniqueMarkets];

    const maxMarkets = 15;
    if (mergedMarkets.length > maxMarkets) {
      mergedMarkets = mergedMarkets.slice(-maxMarkets);
    }

    await this.saveMarketQueue(mergedMarkets);
    return {
      latestMarkets: mergedMarkets,
    };
  },

  getNextMarketToDisplay(
    latestMarkets?: NewMarketMinified[],
  ): Promise<NewMarketMinified | undefined> {
    return new Promise((resolve, reject) => {
      const proceed = (markets: NewMarketMinified[]) => {
        this.getDisplayedMarkets()
          .then((displayedMarketIds) => {
            if (markets.length === 0) {
              return;
            }

            const nextMarket = markets[0]!;
            markets.shift();

            displayedMarketIds.push(nextMarket.conditionId);
            const maxIds = 15;
            const updatedDisplayedMarketIds = displayedMarketIds.slice(-maxIds);

            this.saveDisplayedMarkets(updatedDisplayedMarketIds, markets)
              .then(() => {
                return resolve(nextMarket);
              })
              .catch(reject);
          })
          .catch(reject);
      };

      if (latestMarkets) {
        proceed(latestMarkets);
      } else {
        this.getLatestMarkets()
          .then((markets) => {
            return proceed(markets);
          })
          .catch(reject);
      }
    });
  },

  saveDisplayedMarkets(
    displayedMarkets: string[],
    latestMarkets: NewMarketMinified[],
  ) {
    return chrome.storage.local.set({
      latestMarkets: JSON.stringify(latestMarkets),
      displayedMarketIds: JSON.stringify(displayedMarkets),
      lastDisplayed: Date.now(),
    });
  },

  saveMarketQueue(latestMarkets: NewMarketMinified[]) {
    return chrome.storage.local.set({
      latestMarkets: JSON.stringify(latestMarkets),
    });
  },

  getDisplayedMarkets(): Promise<string[]> {
    return new Promise((resolve) => {
      void chrome.storage.local
        .get('displayedMarketIds')
        .then((displayedMarketIdsRaw) => {
          const displayedMarketIds = displayedMarketIdsRaw.displayedMarketIds
            ? (JSON.parse(displayedMarketIdsRaw.displayedMarketIds) as string[])
            : [];
          return resolve(displayedMarketIds);
        });
    });
  },

  getLastDisplayed(): Promise<number> {
    return new Promise((resolve) => {
      void chrome.storage.local
        .get('lastDisplayed')
        .then((lastDisplayedRaw) => {
          const lastDisplayed = lastDisplayedRaw.lastDisplayed
            ? (JSON.parse(lastDisplayedRaw.lastDisplayed) as number)
            : 0;
          return resolve(lastDisplayed);
        });
    });
  },

  getLatestMarkets(): Promise<NewMarketMinified[]> {
    return new Promise((resolve) => {
      void chrome.storage.local
        .get('latestMarkets')
        .then((latestMarketsRaw) => {
          const latestMarkets = latestMarketsRaw.latestMarkets
            ? (JSON.parse(
                latestMarketsRaw.latestMarkets,
              ) as NewMarketMinified[])
            : [];
          return resolve(latestMarkets);
        });
    });
  },
};
