const b = document.getElementById('main');

const reload = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  b.innerText = enabled ? 'Enabled' : 'Disabled';
};

reload();

b.onclick = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  await browser.storage.local.set({ enabled: !enabled });
  b.innerText = !enabled ? 'Enabled' : 'Disabled';
  await browser.tabs.reload();
};
