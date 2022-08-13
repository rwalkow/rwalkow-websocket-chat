const socket = io();
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

socket.on('message', ({ author, content }) => addMessage(author, content));
let userName = '';

function login(event) {
  event.preventDefault();

  if (!userNameInput.value) {
    alert("Log in field can't be empty!");
  } else {
    userName = userNameInput.value;

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
    socket.emit('join', userName);
  }
}

function sendMessage(e) {
  e.preventDefault();

  if (!messageContentInput.value) {
    alert('Message field can\t be empty!');
  } else {
    addMessage(userName, messageContentInput.value);
    socket.emit('message', {
      author: userName,
      content: messageContentInput.value,
    });
    messageContentInput.value = '';
  }
}

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) {
    message.classList.add('message--self');
  }
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>`;
  messagesList.appendChild(message);
}

loginForm.addEventListener('submit', (e) => {
  login(e);
});

addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});
