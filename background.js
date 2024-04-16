/* global browser */

async function statusHandle(enabled) {
  const iconPath = enabled ? '../assets/icon/bidi-48px.png' : '../assets/icon/bidi-48px-disabled.png';
  browser.browserAction.setIcon({ path: iconPath });
  await browser.tabs.reload();
}

async function iconClicked() {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  await browser.storage.local.set({ enabled: !enabled });
  statusHandle(!enabled);
}

browser.browserAction.onClicked.addListener(iconClicked);
