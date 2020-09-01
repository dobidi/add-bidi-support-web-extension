const popupContent = document.getElementById('popupContent');

const reload = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  input = popupContent.getElementsByTagName("input")[0];
  label = popupContent.getElementsByTagName("label")[0];
  input.checked = enabled ? true : false;
  label.innerText = enabled ? 'Enabled' : 'Disabled';
};

reload();

popupContent.onclick = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  await browser.storage.local.set({ enabled: !enabled });
  input = popupContent.getElementsByTagName("input")[0];
  label = popupContent.getElementsByTagName("label")[0];
  input.checked = !enabled ? true : false;
  label.innerText = !enabled ? 'Enabled' : 'Disabled';
  await browser.tabs.reload();
};
