async function statusHandle(enabled){
  const popupContent = document.getElementById('popupContent');
  const input = popupContent.getElementsByTagName("input")[0];
  const label = popupContent.getElementsByTagName("label")[0];
  input.checked = enabled ? true : false;
  label.innerText = enabled ? 'Enabled' : 'Disabled';

  const iconPath = enabled ? "../assets/icon/bidi-48px.png" : "../assets/icon/bidi-48px-disabled.png";
  browser.browserAction.setIcon({path: iconPath});

  await browser.tabs.reload();
}

const reload = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  statusHandle(enabled)
};

reload();

popupContent.onclick = async () => {
  const { enabled } = await browser.storage.local.get({ enabled: true });
  await browser.storage.local.set({ enabled: !enabled });
  statusHandle(!enabled)
};
