export const getCurrentTab = async () => {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

export const getCardFromUrl = (url: URL) => {
  const base64Card = url.hash.length > 0 ? url.hash.slice(1) : null;
  if (!base64Card) {
    return null;
  }

  try {
    return JSON.parse(atob(base64Card));
  } catch {
    return null;
  }
};

export const formatJson = (json: any) => JSON.stringify(json, null, 2);

export const getCardHash = (cardContent: string) => {
  return btoa(JSON.stringify(JSON.parse(cardContent)));
};
