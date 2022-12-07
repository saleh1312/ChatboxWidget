var cssFile = document.createElement('link');
cssFile.rel = 'stylesheet';
// cssFile.href = 'button.css';
cssFile.href =
  'https://cdn.statically.io/gh/MuhamedAhmed11/ButtonJs/e7429bd5fde0cabd238404dd22a0ddf347efff1b/button.css';
document.head.appendChild(cssFile);

//  Chat Widget Button
let chatbutton = document.createElement('button');
chatbutton.className = 'open-button';
chatbutton.onclick = function openForm() {
  document.getElementById('myForm').style.display = 'block';
};
chatbutton.textContent = 'Chat';
document.body.appendChild(chatbutton);

//
let chatWidget = document.createElement('div');
chatWidget.className = 'chat-popup';
chatWidget.id = 'myForm';
//

let chatForm = document.createElement('form');
chatForm.className = 'form-container';
let header1 = document.createElement('h1');
header1.innerText = 'Chat';

let label = document.createElement('label');
let b = document.createElement('b');
b.innerText = 'Message';
label.appendChild(b);

let msgTextarea = document.createElement('textarea');
msgTextarea.placeholder = 'Type message..';
msgTextarea.name = 'msg';
msgTextarea.required = true;

let sendButton = document.createElement('button');
sendButton.className = 'btn';
sendButton.innerText = 'Send';
sendButton.type = 'submit';

let closeButton = document.createElement('button');
closeButton.className = 'btn cancel';
closeButton.innerText = 'Close';
closeButton.type = 'button';
closeButton.onclick = function closeForm() {
  document.getElementById('myForm').style.display = 'none';
};

//
chatForm.append(header1);
chatForm.append(label);
chatForm.append(msgTextarea);
chatForm.append(sendButton);
chatForm.append(closeButton);
//
chatWidget.appendChild(chatForm);

// let myElm = document.createElement('button')

// myElm.innerText = 'Test';
// myElm.style.color = 'red';
// chatbutton.style.position = 'absolute';
// chatbutton.style.right = '5%';
// chatbutton.style.bottom = '5%';
// chatbutton.style.zIndex = '1000000';
// chatWidget.style.zIndex = '1000000';

document.body.appendChild(chatWidget);
