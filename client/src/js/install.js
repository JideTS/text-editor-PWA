const butInstall = document.getElementById("buttonInstall");

let deferredPrompt;

// Logic for installing the PWA
// DONE WITH THE SUPPORT OF CHATGPT: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Show your custom install button or UI element
  butInstall.style.display = "block";
});

// DONE WITH THE SUPPORT OF CHATGPT: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  // Check if the deferredPrompt is available
  if (deferredPrompt) {
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    // Reset deferredPrompt for future use
    deferredPrompt = null;
    // Hide the install button regardless of the user choice
    butInstall.style.display = "none";
  }
});

// DONE WITH THE SUPPORT OF CHATGPT: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  // The app has been successfully installed
  console.log("App installed!", event);
});

