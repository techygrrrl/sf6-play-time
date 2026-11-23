chrome.action.onClicked.addListener((tab) => {
  if (!tab?.url?.startsWith('https://www.streetfighter.com/6/buckler/profile/')) {
    return
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  });
})
