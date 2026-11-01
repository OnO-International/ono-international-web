'use strict';
const savePhoto = document.getElementById('save-photo');
const shareHelp = document.getElementById('share-help');
const saveStatus = document.getElementById('save-status');
let cardFile;
// Prepare the image before the tap so the native share call retains user activation.
async function preparePhoto() {
  if (typeof navigator.share !== 'function' || typeof navigator.canShare !== 'function') return;
  try {
    const response = await fetch('../assets/shuta-ono-card.png');
    if (!response.ok) return;
    const blob = await response.blob();
    if (blob.type !== 'image/png') return;
    const file = new File([blob], '小野秀太_OnO名刺.png', {type:'image/png'});
    if (!navigator.canShare({files:[file]})) return;
    cardFile = file;
    savePhoto.hidden = false;
    shareHelp.hidden = false;
  } catch {
    // The regular PNG download and long-press remain usable without file sharing.
  }
}
savePhoto.addEventListener('click', async () => {
  if (!cardFile) return;
  savePhoto.disabled = true;
  saveStatus.textContent = '';
  try {
    await navigator.share({files:[cardFile]});
    saveStatus.textContent = '保存先の画面で、画像の保存を完了してください。';
  } catch (error) {
    if (error.name !== 'AbortError') saveStatus.textContent = '共有画面を開けませんでした。画像を長押しするか、「名刺画像をダウンロード」から保存してください。';
  } finally {
    savePhoto.disabled = false;
  }
});
preparePhoto();
