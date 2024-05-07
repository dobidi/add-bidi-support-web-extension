/* global browser */

function updateIcon(enabled) {
  const iconPath = enabled ? '../assets/icon/bidi-48px.png' : '../assets/icon/bidi-48px-disabled.png';

  browser.browserAction.setIcon({ path: iconPath });
}

async function toggleActiveStatus() {
  const { active } = await browser.storage.local.get('active');

  await browser.storage.local.set({ active: !active });

  updateIcon(!active);
  await browser.tabs.reload();
}

async function initialSetup() {
  let { active } = await browser.storage.local.get('active');

  if (active === undefined) {
    await browser.storage.local.set({ active: false });
    active = false;
  }

  updateIcon(active);
}

initialSetup();

browser.browserAction.onClicked.addListener(toggleActiveStatus);
