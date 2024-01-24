import { useCallback, useEffect, useState } from "react";
import { getCurrentTab } from "../lib/utils";

export const useTabUrl = () => {
  const [url, setUrl] = useState<URL | null>(null);

  useEffect(() => {
    const init = async () => {
      const { url } = (await getCurrentTab()) ?? {};

      if (url) {
        setUrl(new URL(url));
      }
    };

    init();
  }, []);

  useEffect(() => {
    const subscribe = async () => {
      const { id: currentTabId } = (await getCurrentTab()) ?? {};

      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (tabId !== currentTabId) {
          return;
        }

        if (changeInfo.url) {
          setUrl(new URL(changeInfo.url));
        }
      });
    };

    subscribe();
  }, []);

  const updateUrl = useCallback(async (newUrlString: string) => {
    const { id, url } = (await getCurrentTab()) ?? {};

    if (!id || !url) {
      return;
    }

    const newUrl = new URL(newUrlString);

    // FIXME: sequential updae did not work
    await chrome.tabs.update({ url: newUrl.toString() });
    setTimeout(() => {
      chrome.tabs.reload();
    }, 200);
  }, []);

  return { url, updateUrl };
};
