import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Simulated message sending
  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Simulate a bot response after a delay
    const botResponse = input.toLowerCase().includes("hello")
      ? "Hi there! How can I help you today?"
      : I'm not sure what you mean by "${input}".;
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botResponse },
      ]);
    }, 500);

    setInput("");
  };

  // Handle text-to-speech for bot messages
  const handleTextToSpeech = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speech);
  };

  // Handle image upload functionality
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMessages((prev) => [
        ...prev,
        { sender: "user", text: You uploaded an image: ${file.name} },
      ]);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat messages */}
      <div className="chat-display">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "user" ? "user" : "bot"
            }`}
          >
            <p>
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
            </p>
            {msg.sender === "bot" && (
              <button
                className="tts-button"
                onClick={() => handleTextToSpeech(msg.text)}
              >
                🔊
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Input section */}
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="input-field"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>

        {/* Image upload button */}
        <label htmlFor="upload-image" className="upload-icon">
          📷
        </label>
        <input
          type="file"
          id="upload-image"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
    </div>
  );
};

export default Chatbot;