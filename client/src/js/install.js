const butInstall = document.getElementById("buttonInstall");

butInstall.style.display = 'none';
window.addEventListener('beforeinstallprompt', (event) => {

    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.style.display = 'block';
  });

butInstall.addEventListener('click', async () => {
  
  const promptEvent = window.deferredPrompt;

 

  if (!promptEvent) {
   return;
  }

  // Show prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, it can only be used once.
  window.deferredPrompt = null;
  
  butInstall.style.display = 'none';
});

window.addEventListener('appinstalled', (event) => {
  // Clear prompt
  window.deferredPrompt = null;
}); 
