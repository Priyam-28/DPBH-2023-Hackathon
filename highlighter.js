
var fileUrl = chrome.runtime.getURL('dataset.txt');
console.log(fileUrl);

fetch(fileUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }
    return response.text();
  })
  .then(content => {

    const arr = content.split('\n').filter(Boolean);
    var words = arr.map(element => element.replace('\r', ''));
    highlightWordsInBody(words);
  })
  .catch(error => {
    console.error(error);
  });

function highlightWordsInBody(words) {
  var bodyText = document.body.innerHTML;
  var matchCounter = 0;

  for (var i = 0; i < words.length; i++) {
    var regex = new RegExp(words[i], 'gi');
    bodyText = bodyText.replace(regex, function (match) {
      matchCounter++;
      return `<mark class="dark-pattern" data-dark-pattern="${words[i]}">${match}</mark>`;
    });
  }

  // Sending dark patterns count to popup.js
  sendMatchCounter(matchCounter);
  document.body.innerHTML = bodyText;

  // Add event listener for popover messages
  document.querySelectorAll('.dark-pattern').forEach(element => {
    element.addEventListener('mouseenter', handleHover);
    element.addEventListener('mouseleave', handleHoverLeave);
  });
}

function sendMatchCounter(counter) {
  chrome.runtime.sendMessage({ action: 'sendMatchCounter', matchCounter: counter });
}


function handleHover(event) {
  const darkPattern = event.target.dataset.darkPattern;
  if (darkPattern) {
    const popover = createPopover(darkPattern);
    document.body.appendChild(popover);
    positionPopover(event.target, popover);
  }
}

function createPopover(content) {
  const popover = document.createElement('div');
  popover.className = 'popover';
  popover.textContent = `🚨Caution: This may be a deceptive design to manipulate your actions.Kindly read reviews and purchase`;
  return popover;
}

function positionPopover(target, popover) {
  const rect = target.getBoundingClientRect();
  popover.style.position = 'absolute';
  popover.style.backgroundColor='yellow';
  popover.style.height='auto';
  popover.style.width='200px';
  popover.style.paddingTop='10px';


  popover.style.top = `${rect.bottom + window.scrollY}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;
}

function handleHoverLeave(event) {

  const popover = document.querySelector('.popover');
  if (popover) {
    popover.remove();
  }
}