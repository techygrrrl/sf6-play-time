chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url && changeInfo.url.startsWith('https://www.streetfighter.com/6/buckler/profile/')) {
    const ending = changeInfo.url.split('https://www.streetfighter.com/6/buckler/profile/')[1]

    if (!ending.includes('/')) {
      // Only reload if it's the base of the profile page
      chrome.tabs.reload(tabId);
    }
  }
});
