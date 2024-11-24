
// Connect to the WebSocket server
//const socket = io("wss://www.chattydaadi.fun"); // Replace with your server URL
const socket = io(window.location.protocol + "//" + window.location.hostname);



// Get DOM elements
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const notifications = document.getElementById("notifications");

// Store the client's unique identifier
const clientId = `client_${Math.random().toString(36).substr(2, 9)}`;

// Add a message to the chat box
function addMessage(text, type) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);
  messageElement.textContent = text;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

// Send a message to the server
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    console.log("Sending message:", message); // Debug: Log the message being sent
    socket.emit("chatMessage", { message, senderId: clientId }); // Include the sender ID
    addMessage(message, "sent"); // Add the message to the chat box as "sent"
    console.log("Message added to chat box as 'sent'"); // Debug: Confirm message addition
    messageInput.value = ""; // Clear the input
  }
});

// Send a message when pressing "Enter" in the input field
messageInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") { // Check if the pressed key is "Enter"
    const message = messageInput.value.trim();
    if (message) {
      console.log("Sending message:", message); // Debug: Log the message being sent
      socket.emit("chatMessage", { message, senderId: clientId }); // Include the sender ID
      addMessage(message, "sent"); // Add the message to the chat box as "sent"
      console.log("Message added to chat box as 'sent'"); // Debug: Confirm message addition
      messageInput.value = ""; // Clear the input
      event.preventDefault(); // Prevent default behavior of Enter (e.g., form submission)
    }
  }
});

// Listen for messages from the server
socket.on("chatMessage", ({ message, senderId }) => {
  // Check if the message is from this client
  if (senderId !== clientId) {
    addMessage(message, "received"); // Add the received message to the chat box
  } else {
    console.log("Ignored own message from server"); // Debug: Avoid duplicating messages
  }
});

// Function to add a notification for new comments
function addNotification(comment) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `
    <strong>${comment.user}</strong> commented: "${comment.text}" on Post ID: ${comment.postId}
  `;
  notifications.appendChild(notification);

  // Automatically remove the notification after 10 seconds
  setTimeout(() => {
    notification.remove();
  }, 10000);
}

// Listen for new comment notifications from the server
socket.on("newComment", (comment) => {
  addNotification(comment);
});