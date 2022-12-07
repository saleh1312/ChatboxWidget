//  Chat Widget Button
let chatbutton = document.createElement('button');
chatbutton.className = 'open-button';
chatbutton.onclick = 'openForm()';
document.body.appendChild(chatbutton);

//
let chatWidget = document.createElement('div');
chatWidget.className = 'chat-popup';

//
let chatForm = document.createElement('from');
chatForm.className = 'form-container';
let header1 = document.createElement('h1');
header1.innerText('Chat');

//
chatForm.append(header1);
//
chatWidget.appendChild(chatForm);

// myElm.innerText = 'Test';
// myElm.style.color = 'red';
// myElm.style.position = 'absolute';
// myElm.style.right = '5%';
// myElm.style.bottom = '5%';
// myElm.style.zIndex = '1000000';

document.body.appendChild(chatWidget);
