const socket = io();
let user;
let chatBox = document.getElementById("chatBox");
let log = document.getElementById("messageLogs");

//socket.on("message", (msg) => {
//    data = msg;
//});
//

// Escuchar el evento 'messageLogs' para recibir los mensajes del historial del chat
socket.on("messageLogs", (msgs) => {
  renderizar(msgs);
});

const renderizar = (msgs) => {
  let messages = "";

  msgs.forEach((message) => {
    const isCurrentUser = message.user === user;
    const messageClass = isCurrentUser ? "my-message" : "other-message";
    messages += `<div class="${messageClass}">${message.user}: ${message.message}</div>`;
  });

  log.innerHTML = messages;
  chatBox.scrollIntoView(false);
};

Swal.fire({
  title: "Identificate",
  input: "email",
  text: "Ingresa tu email para identificarte",
  inputValidator: (value) => {
    if (!value) return "Ingresa un email para continuar";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Ingresa un email válido";
    return null;
  },
  allowOutsideClick: false,
}).then((result) => {
  if (result.isConfirmed) {
    user = result.value;
    socket.emit("newUser");
  }
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      const message = chatBox.value;
      socket.emit("message", { user, message });
      chatBox.value = "";
    }
  }
});

socket.on("newUser", () => {
  Swal.fire({
    text: "Un nuevo usuario se ha conectado",
    toast: true,
    position: "top-right",
  });
});
