let username = null;
while(!username) {
  username = prompt("아이디를 입력하세요.");
}
document.querySelector("span#username").innerHTML = username;

let roomNum = null;
while(!roomNum) {
  roomNum = parseInt(prompt("채팅방 번호를 입력하세요"))
}

const eventSource = new EventSource(`http://localhost:8080/chat/roomNum/${roomNum}`);
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // 내가 보낸경우.
  if(data.sender === username) {
    printSendMessage(data);
    return;
  }
  // 다른사람이 보낸경우.
  printReceiveMessage(data);
}

function getMessageBox(data) {
  return `<p>${data.msg}</p>
  <span class="time_date">
    <b>${data.sender}</b> / ${data.createdAt}
  </span>`;
}

function getSendMessageBox(data) {
  return `<div class="sent_msg">${getMessageBox(data)}</div>`;
}

function getReceiveMessageBox(data) {
  return `<div class="received_msg">
              <div class="received_withd_msg">${getMessageBox(data)}</div>
            </div>`;
}

function scrollTop() {
  document.documentElement.scrollTop = document.body.scrollHeight;
}

function printReceiveMessage(data) {
  let receiveBox = document.createElement("div");
  receiveBox.className = "incoming_msg";
  receiveBox.innerHTML = getReceiveMessageBox(data);

  appendChatBox(receiveBox);
  scrollTop();
}

function printSendMessage(data) {
  let sendBox = document.createElement("div");
  sendBox.className = "outgoing_msg";
  sendBox.innerHTML = getSendMessageBox(data);

  appendChatBox(sendBox);
  scrollTop();
}

function appendChatBox(messageBox) {
  document.querySelector("#chat-box")
          .append(messageBox);
}

function sendMessage() {
  let messageInput = document.querySelector("#chat-outgoing-msg");
  let message = messageInput.value;
  if (!message) {
    return;
  }

  let chat = {
    sender: username,
    roomNum: roomNum,
    msg: message
  };

  fetch("http://localhost:8080/chat", {
    method: "post",
    body: JSON.stringify(chat),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });

  messageInput.value = "";
}

document.querySelector("#chat-send").addEventListener("click", () => {
  sendMessage();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
  if (e.keyCode == 13) { // 엔터
    sendMessage();
  }
});

document.querySelector("#chat-outgoing-msg").focus();
