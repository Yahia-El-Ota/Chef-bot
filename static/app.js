class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if(this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Sam", message: r.answer };
            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Sam")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();



// class Chatbox {
//     constructor(a, b, c, d) {
//         this.args = {
//             button: a,
//             chatbox: b,
//             sendbutton: d
//         }
//         this.icons = c;
//         this.state = false;
//         this.messages = []; 
//     }

//     display() {
//         const {button, chatbox, sendbutton} = this.args;
        
//         button.addEventListener('click', () => this.toggleState(chatbox))
//         sendbutton.addEventListener('click', () => this.onSendButton(chatbox))

//         const node = chatbox.querySelector('input');
//         node.addEventListener("keyup", ({key}) => 
//         {
//             if (key === "Enter")
//             {
//                 this.onSendButton(chatbox)
//             }
//         })


//     }

//     toggleState(chatbox) {
//         this.state = !this.state;
//         this.showOrHideChatBox(chatbox, this.args.button);
//     }

//     showOrHideChatBox(chatbox, button) {
//         if(this.state) {
//             chatbox.classList.add('chatbox--active')
//             this.toggleIcon(true, button);
//         } else if (!this.state) {
//             chatbox.classList.remove('chatbox--active')
//             this.toggleIcon(false, button);
//         }
//     }

//     toggleIcon(state, button) {
//         const { isClicked, isNotClicked } = this.icons;
//         let b = button.children[0].innerHTML;

//         if(state) {
//             button.children[0].innerHTML = isClicked; 
//         } else if(!state) {
//             button.children[0].innerHTML = isNotClicked;
//         }
//     }


//     onSendButton(chatbox)
//     {
//         var textField = chatbox.querySelector('input');
//         let text1 = textField.value
//         if (text1 === ""){
//             return;
//         }

//         let msg1 = { name: "User", message: text1 }
//         this.messages.push(msg1);

//         // 'http://127.0.0.1:5000/predict
//         fetch('http://127.0.0.1:5000'+ '/templates/index.html',{
//             method: 'POST',
//             body: JSON.stringify({ message: text1 }),
//             mode: 'cors',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         })
//         .then(r => r.json())
//         .then(r =>{
//             let msg2 = { name: "ChefBot", message: r.answer };
//             this.messages.push(msg2);
//             this.updateChatText(chatbox)
//             textField.value =''

//         }).catch((error) => {
//             console.error('Error:', error);
//             this.updateChatText(chatbox)
//             textField.value =''
//         }); 
//     }

//     updateChatText(chatbox) 
//     {
//         var html ='';
//         this.messages.slice().reverse().forEach(function(item){
//             if (item.name === "ChefBot")
//             {
//                 html += '<div class="messages__item messages__item--visitor">'+ item.message + '</div>'
//             }
//             else
//             {
//                 html += '<div class="messages__item messages__item--operator">'+ item.message + '</div>'
//             }});

//         const chatmessage = chatbox.querySelector('.chatbox__messages');
//         chatmessage.innerHTML = html;
//     }


// }


// const chatButton = document.querySelector('.chatbox__button');
// const chatContent = document.querySelector('.chatbox__support');
// const sendButton = document.querySelector('.send__button');
// const icons = {
//     isClicked: '</p>Clicked!</p>',
//     isNotClicked: '<p>Not clicked!</p>'
// }
// const chatbox = new Chatbox(chatButton, chatContent, icons, sendButton);
// chatbox.display();
// chatbox.toggleIcon(false, chatButton);


