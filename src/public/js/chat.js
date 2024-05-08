const socket = io();

let user;
let chatBox = document.getElementById("chatBox");
let log = document.getElementById("messageLogs");

socket.on("message", (msg) => {
  data = msg;
});

socket.on("messageLogs", (msg) => {
  renderizar(msgs);
});

const renderizar = (msgs) => {
  let messages = "";

  msgs.forEach((message) => {
    const isCurrentUser = message.user === user;
    const messageClass = isCurrentUser ? "my-message" : "other-message";
    messages =
      messages +
      `<div class="${messageClass}">${message.user}: ${message.message}</div>`;
  });

  log.innerHTML = messages;
  chatBox.scrollIntoView(false);
};

Swal.fire({
  title: "Identificate",
  input: "Email",
  text: "Ingresa tu email para identificarte",
  inputValidator: (value) => {
    if (!value)
        return "Ingresa un email para continuar"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value))
        return 'Ingresa un email válido';  
    return null;
    },
    allowOutsideClick: false
}).then((result) => {
  if (result.isConfirmed) {
    user = result.value;
    renderizar(data);
  }
});
