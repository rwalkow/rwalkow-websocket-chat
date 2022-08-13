const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

function login(event) {
  event.preventDefault();

  if (!userNameInput.value) {
    alert("Log in field can't be empty!");
  } else {
    userName = userNameInput.value;

    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

function sendMessage(e) {
  e.preventDefault();

  if (!messageContentInput) {
    alert('Message field can\t be empty!');
  } else {
    addMessageForm(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
}

function addMessageForm(author, messageContent) {}

loginForm.addEventListener('submit', (e) => {
  login(e);
});

addMessageForm.addEventListener('submit', (e) => {
  sendMessage(e);
});
