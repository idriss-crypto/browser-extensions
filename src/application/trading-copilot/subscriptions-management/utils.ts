import { useQuery } from "@tanstack/react-query";

import { Subscription } from "./types";
import { SUBSCRIPTIONS_STORAGE_KEY } from "./constants";

export const useSubscriptions = () => {
  return useQuery({
    queryKey: ['copilotSubscriptions'],
    queryFn: () => {
      console.log('useSubscriptions')
      return new Promise<Subscription[]>((resolve) => {
        void chrome.storage.local
          .get([SUBSCRIPTIONS_STORAGE_KEY])
          .then((result) => {
            resolve(result[SUBSCRIPTIONS_STORAGE_KEY] ?? []);
          });
      });
    },
  });
}