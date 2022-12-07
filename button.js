var cssFile = document.createElement('link');
cssFile.rel = 'stylesheet';
cssFile.href = 'button.css';
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

let button1 = document.createElement('button');
button1.className = 'btn';
button1.innerText = 'Send';
button1.type = 'submit';

let button2 = document.createElement('button');
button2.className = 'btn cancel';
button2.innerText = 'Close';
button2.type = 'button';

//
chatForm.append(header1);
chatForm.append(label);
chatForm.append(msgTextarea);
chatForm.append(button1);
chatForm.append(button2);
//
chatWidget.appendChild(chatForm);

// let myElm = document.createElement('button')

// myElm.innerText = 'Test';
// myElm.style.color = 'red';
// chatbutton.style.position = 'absolute';
// chatbutton.style.right = '5%';
// chatbutton.style.bottom = '5%';
chatWidget.style.zIndex = '1000000';

document.body.appendChild(chatWidget);
