chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.startsWith('https://www.streetfighter.com/6/buckler/profile/')) {
    chrome.tabs.reload(tabId);
  }
});
