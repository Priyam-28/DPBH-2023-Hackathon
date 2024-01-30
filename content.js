// content.js

let isDetectionActivated = false;

function detectAndHighlightCloseButtons() {
  if (isDetectionActivated) {
    const closeElements = document.querySelectorAll('button, [aria-label="Close"], [aria-label="Cancel"], [class*="close"], [class*="exit"], [class*="cancel"]');
  
    closeElements.forEach(element => {
      element.style.backgroundColor = 'yellow';
      element.style.color = 'black';
    });

    alert('Detected and highlighted potential close buttons on this page.');
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'detectAndHighlightCloseButtons') {
    isDetectionActivated = !isDetectionActivated;
    detectAndHighlightCloseButtons();
  }
});
