document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('toggleExtension').addEventListener('change', function () {
        if (this.checked) {
            console.log('Extension enabled');
            chrome.tabs.executeScript({
                file: 'highlighter.js'
            
            });
        } else {
            console.log('Extension disabled');
            chrome.tabs.reload();

        }
    });
});

// document.getElementById('activateButton').addEventListener('click', () => {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const activeTab = tabs[0];
//       chrome.tabs.sendMessage(activeTab.id, { action: 'highlightCancelElements' });
//     });
//   });
// popup.js

document.getElementById('activateButton').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { action: 'detectAndHighlightCloseButtons' });
    });
  });
  
  



