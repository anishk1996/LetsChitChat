const socket = io();
const urlParams = new URLSearchParams(window.location.search);
let name;
let textArea = document.querySelector('#textarea');
let sendBtn = document.querySelector('#send-button');
let reloadChat = document.querySelector('#reloadChat');
let messageArea = document.querySelector('.message_area');
let timer;
let limit = 10;
let counter = 2;
let chatArr = [];
do {
    name = urlParams.get('u') || 'default';
} while(!name);

document.addEventListener('DOMContentLoaded', function(event){ 
    // window.history.replaceState(null, null, window.location.pathname);
    console.log('asdfg', urlParams.get('u'));
});

sendBtn.addEventListener('click', (event) => {
    let val = document.getElementById('textarea').value;
    if (val.length !== 0) {
        sendMessage(val);
        document.getElementById('textarea').value = '';
        scrollToBottom();
    }
});

reloadChat.addEventListener('click',(event) => {
    let pastMessages = [];
    var http = new XMLHttpRequest();
        var url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/getMessages?limit=${limit}`;
        http.open('GET', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                let pastMessages1 = JSON.parse(http.responseText);
                for (let a = chatArr.length -1; a >= 0; a--) {
                    pastMessages.push(chatArr[a]); 
                }
                for (let b = 0; b < pastMessages1.length; b++) {
                    pastMessages.push(pastMessages1[b]);
                }
                let type;
                removeAllChildNodes(messageArea);
                for(let i = pastMessages.length - 1; i >= 0; i--) {
                    if (pastMessages[i].name === name) {
                        type = 'outgoing';
                    } else {
                        type = 'incoming';
                    }
                    let mainDiv = document.createElement('div');
                    let className = type;
                    mainDiv.classList.add(className, 'message');
                    let markup = `
                        <h4>${pastMessages[i].name}</h4>
                        <p>${pastMessages[i].message}</p>
                    `;
                    mainDiv.innerHTML = markup;
                    messageArea.appendChild(mainDiv);
                }
                // return (http.responseText);
            }
        }
        http.send();
});

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

textArea.addEventListener('keyup', (event) => {
    if (counter === 2) {
        timer = moment();
    }
    if(event.key === 'Enter') {
        if (counter !== 0) {
            if (event.target.value.length !== 0) {
                sendMessage(event.target.value);
                event.target.value = '';
                scrollToBottom();
                --counter;
            }
        } else {
            let cTime = moment();
            let duration = moment.duration(cTime.diff(timer));
            let sec = duration.asSeconds();
            console.log('dsfgf', sec);
            if (sec > 10) {
                counter = 2;
                if (event.target.value.length !== 0) {
                    sendMessage(event.target.value);
                    event.target.value = '';
                    scrollToBottom();
                    --counter;
                }
            } else {
                alert('You cannot send more than 2 messages in 10 sec');
            }
        }
    }
});

function sendMessage(message) {
    let msg = {
        usr: name,
        message: message.trim()
    };
    //Append message
    appendMessage(msg, 'outgoing');

    //save message on db
    saveMessageOnDb();
    //send to socket server
    socket.emit('message sent', msg);
}

function saveMessageOnDb() {
    if (chatArr.length >= limit) {
        var http = new XMLHttpRequest();
        var url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/saveMessage`;
        http.open('POST', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                return (http.responseText);
            }
        }
        http.send(JSON.stringify(chatArr));
        chatArr = [];
    }
}


function appendMessage(msg, type) {
    if (msg.usr !== 'BOT') {
        let newBody = {
            name: msg.usr,
            message: msg.message
        }
        chatArr.push(newBody);    
    }
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let date = new Date();
    let date1 = moment().format('llll');
    let markup = `
        <h4>${msg.usr}</h4>
        <p>${msg.message}</p>
        <h6>${date1}</h6>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

function reloadPreviousMessages(array) {

}

// receive message
socket.on('message sent', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
})

socket.on('bot', (msg) => {
    let message = {
        usr: 'BOT',
        message: msg
    }
    appendMessage(message, 'incoming');
    scrollToBottom();
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}