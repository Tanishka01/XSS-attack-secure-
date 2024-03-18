const userMessages = [];

const userMessageForm = document.querySelector('form');
const userMessagesList = document.querySelector('ul');

function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function isValidURL(url) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(url);
}

function renderMessages() {
  let messageItems = '';
  for (const message of userMessages) {
    const escapedText = escapeHTML(message.text);
    const escapedImage = escapeHTML(message.image);
    messageItems += `
      <li class="message-item">
        <div class="message-image">
          <img src="${escapedImage}" alt="${escapedText}">
        </div>
        <p>${escapedText}</p>
      </li>
    `;
  }

  userMessagesList.innerHTML = messageItems;
}

function formSubmitHandler(event) {
  event.preventDefault();
  const userMessageInput = event.target.querySelector('textarea');
  const messageImageInput = event.target.querySelector('input');
  const userMessage = userMessageInput.value.trim();
  const imageUrl = messageImageInput.value.trim();

  // Validate inputs
  if (!userMessage || !imageUrl || !isValidURL(imageUrl)) {
    alert('Please insert a valid message and image URL.');
    return;
  }

  // Sanitize user inputs
  const sanitizedMessage = escapeHTML(userMessage);
  const sanitizedImageUrl = escapeHTML(imageUrl);

  userMessages.push({
    text: sanitizedMessage,
    image: sanitizedImageUrl,
  });

  userMessageInput.value = '';
  messageImageInput.value = '';

  renderMessages();
}
function navigateToPage1() {
  window.location.href = 'https://tanishka01.github.io/XSS-attack-vulnerable-/';
}

userMessageForm.addEventListener('submit', formSubmitHandler);
userMessageForm.addEventListener('button', navigateToPage1);

