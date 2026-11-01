'use strict';
const CARD_URL = 'https://ono-international.com/card/contact/';
const dialog = document.getElementById('qr-dialog');
const status = document.getElementById('status');
let toastTimer;
function notify(message) {
  clearTimeout(toastTimer);
  (dialog.open ? dialog : document.body).append(status);
  status.textContent = message;
  status.classList.add('visible');
  toastTimer = setTimeout(() => status.classList.remove('visible'), 3500);
}
document.getElementById('show-qr').addEventListener('click', () => dialog.showModal());
document.getElementById('close-qr').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  status.classList.remove('visible');
  document.body.append(status);
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
async function copyLink() {
  try {
    await navigator.clipboard.writeText(CARD_URL);
    notify('名刺のURLをコピーしました');
  } catch {
    if (!dialog.open) dialog.showModal();
    const input = document.getElementById('card-url');
    input.focus();
    input.select();
    input.setSelectionRange(0, input.value.length);
    notify('URLを長押し、または選択してコピーしてください');
  }
}
document.getElementById('copy-link').addEventListener('click', copyLink);
document.getElementById('share-card').addEventListener('click', async () => {
  if (navigator.share) {
    try {
      await navigator.share({title:'小野 秀太 | OnO International',text:'小野秀太のデジタル名刺',url:CARD_URL});
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }
  await copyLink();
});
