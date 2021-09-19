const eventSource = new EventSource(
    "http://localhost:8080/sender/ssar/receiver/cos");

eventSource.onmessage = (event) => {
  console.log(1, event);
  const data = JSON.parse(event.data);
  printReceiveMsg(data)
  console.log(2, data);
}

function getSendMsgBox(msg, time) {
  return `<div class="sent_msg">
  <p>${msg}</p>
  <span class="time_date"> ${time}</span>
</div>`;
}

function getReceiveMsgBox(msg, time) {
  return `<div class="received_msg">
              <div class="received_withd_msg">
                <p>${msg}</p>
                <span class="time_date"> ${time}</span>
              </div>
            </div>`;
}

function printReceiveMsg(data) {
  let chatBox = document.querySelector("#chat-box");

  let chatOutgoingBox = document.createElement("div");
  chatOutgoingBox.className = "incoming_msg";

  chatOutgoingBox.innerHTML = getReceiveMsgBox(data.msg, data.createdAt);
  chatBox.append(chatOutgoingBox);
}

function printSentMsg() {
  let chatBox = document.querySelector("#chat-box");
  let msgInput = document.querySelector("#chat-outgoing-msg");
  let msg = msgInput.value;
  if (!msg) {
    return;
  }

  let chatOutgoingBox = document.createElement("div");
  chatOutgoingBox.className = "outgoing_msg";

  let date = new Date();
  let now = `${date.getHours()}:${date.getMinutes()} | ${date.getFullYear()}-${date.getMonth()
  + 1}-${date.getDate()}`;

  chatOutgoingBox.innerHTML = getSendMsgBox(msg, now);
  chatBox.append(chatOutgoingBox);

  msgInput.value = "";
}

document.querySelector("#chat-send").addEventListener("click", () => {
  printSentMsg();
});

document.querySelector("#chat-outgoing-msg").addEventListener("keydown",
    (e) => {
      if (e.keyCode == 13) {
        printSentMsg();
      }
    });

document.querySelector("#chat-outgoing-msg").focus();
