const button = document.getElementById("chat-button");
const box = document.getElementById("chat-box");
const send = document.getElementById("chat-send");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");

// Mostrar / ocultar chat
button.onclick = () => {
  box.classList.toggle("hidden");
};

// Añadir mensaje
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.style.marginBottom = "10px";
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// Enviar mensaje
async function sendMessage() {
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "Tú");
  input.value = "";

  addMessage("Pensando...", "IA");

  try {
    const res = await fetch("https://project-ci1v4.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    // eliminar "Pensando..."
    messages.lastChild.remove();

    //addMessage(data.answer, "IA");
    addMessage(data.answer.replace(/(\/posts\/[^\s]+)/g, '<a href="$1">$1</a>'), "IA");

  } catch (err) {
    messages.lastChild.remove();
    addMessage("Error al conectar con el servidor", "IA");
  }
}

// botón
send.onclick = sendMessage;

// enter
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});