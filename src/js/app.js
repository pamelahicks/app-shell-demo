var deferredPrompt;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => {
      console.log('Service worker registered');
    })
    .catch(err => {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', e => {
  console.log('beforeinstallprompt fired');
  e.preventDefault();
  deferredPrompt = e;
  return false;
});
