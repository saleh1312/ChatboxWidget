var cssFile = document.createElement('link');
cssFile.rel = 'stylesheet';
cssFile.href =
  'https://cdn.statically.io/gh/MuhamedAhmed11/ButtonJs/c32e35a3fba8ae7f3fbde2d9f5674fac59c3909b/ChatWidget.css';
// cssFile.href = 'ChatWidget.css';
document.head.appendChild(cssFile);

class ChatWidget {
  constructor() {
    this.started = false;
    this.msg = undefined;
    this.username = localStorage.getItem('username')
      ? JSON.parse(localStorage.getItem('username'))
      : '';
    this.email = localStorage.getItem('email')
      ? JSON.parse(localStorage.getItem('email'))
      : '';
    this.userId = localStorage.getItem('userId')
      ? JSON.parse(localStorage.getItem('userId'))
      : '';
    this.messages = [];
    this.cs = undefined;
    this.sid = document.currentScript.getAttribute('sid');
    this.delay = (ms) => new Promise((res) => setTimeout(res, ms));
  }

  sendMessage(msg, chatbox_support) {
    console.log(msg);
    console.log(this.sid);
    console.log(localStorage.getItem('userId'));
    fetch('https://chatbotey-gxkpqz66ta-od.a.run.app/website', {
      method: 'POST',
      body: JSON.stringify({ message: msg, sid: this.sid,userid: localStorage.getItem('userId') })
    })
      .then((resp) => resp.json())
      .then(async (resp) => {
        this.messages.push({
          name: 'Pi bot',
          message: 'typing...',
          type: 'text',
        });
        this.updateMessages(chatbox_support);

        await this.delay(1500);
        this.messages.pop();
        this.messages.push({
          name: 'Pi bot',
          message: resp,
          type: resp.type,
        });
        this.updateMessages(chatbox_support);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  displayInfo() {
    // Open Button
    this.buttonWithIcon();
    //
    this.chatboxPopup();
  }

  buttonWithIcon() {
    let chatbutton = document.createElement('input');
    chatbutton.type = 'checkbox';
    chatbutton.id = 'click';

    let label = document.createElement('label');
    label.htmlFor = 'click';
    let i1 = document.createElement('i');
    i1.className = 'fab fa-facebook-messenger';

    let i2 = document.createElement('i');
    i2.className = 'fas fa-times';

    label.appendChild(i1);
    label.appendChild(i2);
    //
    document.body.appendChild(chatbutton);
    document.body.appendChild(label);
  }

  chatboxPopup() {
    let chatboxPopup = document.createElement('div');
    chatboxPopup.className = 'wrapper';

    let headText = document.createElement('div');
    headText.className = 'head-text';
    headText.innerText = 'Pi Bot';

    let headP = document.createElement('p');
    headP.innerText = '(Online)';

    let chatBox = document.createElement('div');
    chatBox.className = 'chat-box';

    let descText = document.createElement('div');
    descText.className = 'desc-text';
    descText.innerText =
      'Please fill out the form below to start chatting.';

    chatBox.appendChild(descText);
    if (!this.started) {
      let form = document.createElement('form');
      form.onsubmit = 'return false';

      let fieldDiv1 = document.createElement('div');
      fieldDiv1.className = 'field';
      let nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.placeholder = 'Your Name';
      nameInput.required = true;

      let fieldDiv2 = document.createElement('div');
      fieldDiv2.className = 'field';
      let emailInput = document.createElement('input');
      emailInput.type = 'email';
      emailInput.placeholder = 'Email Address';
      nameInput.required = true;
      nameInput.defaultValue = this.username;
      emailInput.defaultValue = this.email;
      nameInput.addEventListener('change', (event) => {
        this.username = event.target.value;
      });
      emailInput.addEventListener('change', (event) => {
        this.email = event.target.value;
      });

      let fieldDiv3 = document.createElement('div');
      fieldDiv3.className = 'field';

      let startButton = document.createElement('button');
      startButton.innerText = 'Start Chat';
      startButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (
          this.username === '' ||
          this.email === '' ||
          this.username === undefined ||
          this.email === undefined
        )
          return;
        if (this.userId === '') {
          fetch('https://chatbotey-gxkpqz66ta-od.a.run.app/generateId', {
            method: 'POST',
            body: JSON.stringify({ test: 'test' })
          })
            .then(async (resp) => {
              let respond = await resp.json();
              localStorage.setItem(
                'userId',
                JSON.stringify(respond.id)
              );
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
        localStorage.setItem(
          'username',
          JSON.stringify(this.username)
        );
        localStorage.setItem('email', JSON.stringify(this.email));
        this.started = true;
        this.displayInfo();
      });
      fieldDiv3.appendChild(startButton);

      fieldDiv1.appendChild(nameInput);
      fieldDiv2.appendChild(emailInput);
      form.appendChild(fieldDiv1);
      form.appendChild(fieldDiv2);
      form.appendChild(fieldDiv3);

      chatBox.appendChild(form);
    } else {
      let chatbox_support = document.createElement('div');
      this.cs = chatbox_support;
      chatbox_support.className = 'chatbox__support';
      //   chatbox_support.style.zIndex = '100000';
      let chatbox_messages = document.createElement('div');
      chatbox_messages.className = 'chatbox__messages';
      let emptyDiv = document.createElement('div');
      let chatbox_footer = document.createElement('div');
      chatbox_footer.className = 'chatbox__footer';

      let messageInput = document.createElement('input');
      messageInput.type = 'text';
      messageInput.placeholder = 'Write a message...';
      messageInput.addEventListener('change', (event) => {
        event.preventDefault();
        this.msg = event.target.value;
        event.target.value = '';
      });
      let sendButton = document.createElement('button');
      sendButton.className = 'chatbox__send--footer send__button';
      sendButton.innerText = 'Send';
      sendButton.addEventListener('keyup', ({ key }) => {
        if (key === 'Enter') {
          this.updateChatText(chatbox_support, this.msg);
          this.msg = undefined;
        }
      });
      sendButton.addEventListener('click', (event) => {
        event.preventDefault();
        this.updateChatText(chatbox_support, this.msg);
        this.msg = undefined;
      });

      chatbox_footer.appendChild(messageInput);
      chatbox_footer.appendChild(sendButton);
      chatbox_messages.appendChild(emptyDiv);
      chatbox_support.appendChild(chatbox_messages);
      chatbox_support.classList.add('chatbox--active');
      this.updateChatText(chatbox_support);
      chatBox.appendChild(chatbox_support);
      chatBox.appendChild(chatbox_footer);
    }

    let chatbox_footer2 = document.createElement('div');
    chatbox_footer2.className = 'chatbox__footer__text';
    let footerText = document.createElement('p');
    footerText.innerText = 'Powered by ';
    let footerLink = document.createElement('a');
    footerLink.href = 'http://electropi.ai/';
    footerLink.innerText = 'Electro Pi';
    footerText.appendChild(footerLink);
    chatbox_footer2.appendChild(footerText);
    chatBox.appendChild(chatbox_footer2);

    chatboxPopup.appendChild(headText);
    headText.appendChild(headP);
    chatboxPopup.appendChild(chatBox);

    document.body.appendChild(chatboxPopup);
  }

  updateChatText(chatbox_support, newMessage) {
    if (this.messages.length == 0) {
      this.messages.push(
        {
          name: 'Pi bot',
          message: `Hello ${this.username}, I'm Pi Bot`,
          type: 'text',
        },
        {
          name: 'Pi bot',
          message: 'How can I help you?',
          type: 'text',
        }
      );
    }

    if (newMessage != undefined) {
      this.sendMessage(newMessage, chatbox_support);
      this.messages.push({
        name: 'me',
        message: newMessage,
        type: 'text',
      });
    }
    this.updateMessages(chatbox_support);
  }

  updateMessages(chatbox_support) {
    var html = '';
    this.messages
      .slice()
      .reverse()
      .forEach(function (item) {
        if (item.name === 'Pi bot') {
          if (item.type === 'text') {
            html +=
              '<div class="messages__item messages__item--visitor">' +
              item.message +
              '</div>';
          }
          if (item.type === 'text_buttons') {
            html +=
              '<div class="messages__item messages__item--visitor">' +
              '<div class="card msgCard" style="width: 18rem; background-color: #e0e0e0;">' +
              '<div class="card-header">' +
              `${item.message.answer.message.text}` +
              '</div>' +
              '<ul class="list-group list-group-flush">' +
              `${item.message.answer.message.quick_replies
                .map((reply) => {
                  return `<button class="list-group-item" onclick="onClickHandler('${reply.title}')"}>${reply.title}</li>`;
                })
                .join('')}` +
              '</ul>' +
              '</div>' +
              '</div>';
          }
          if (item.type === 'image') {
            html +=
              '<div class="messages__item messages__item--visitor">' +
              '<div class="card msgCard" style="width: 18rem; background-color: #e0e0e0;">' +
              '<div class="card-body">' +
              `<img src=${item.message.answer.message.attachment.payload.url} width='180rem' />` +
              '</div>' +
              '</div>' +
              '</div>';
          }

          if (item.type === 'url') {
            html +=
              '<div class="messages__item messages__item--visitor">' +
              '<div class="card msgCard" style="width: 18rem; background-color: #e0e0e0;">' +
              '<div class="card-body">' +
              `<a>${item.message.answer.message.text}` +
              `</a>` +
              '</div>' +
              '</div>' +
              '</div>';
          }
        } else {
          html +=
            '<div class="messages__item messages__item--operator">' +
            item.message +
            '</div>';
        }

        const chatbotMessage = chatbox_support.querySelector(
          '.chatbox__messages'
        );
        chatbotMessage.innerHTML = html;
      });
  }
}
let chatWidget = new ChatWidget();
chatWidget.displayInfo();

onClickHandler = (title) => {
  chatWidget.messages.push({
    name: 'me',
    message: title,
    type: 'text',
  });
  chatWidget.sendMessage(title, chatWidget.cs);
};
