import React, { useState } from 'react';
import './Layout.css';
import logo from '../../client/components/6650969.png'; // Use this as the voice input icon.

export default function Layout() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { sender: 'user', text: message }]);
      setMessage('');
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'virtual_patient', text: 'This is the virtual patient response.' },
        ]);
      }, 1000); // Simulate a response delay
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech Recognition not supported in this browser. Try Chrome or Edge.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage(transcript); // Update the message input field with the recognized text.
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      <h1>Virtual Clinic</h1>
      <hr />

      {/* Virtual Assistance or Introduction */}
      <div className="chat-area">
        <h2>Chat with Virtual Patient</h2>
      </div>

      {/* Messages Container */}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <footer>
        <div className="input-container">
          <img
            src={logo}
            alt="voice input"
            className="logo"
            onClick={handleVoiceInput}
            style={{ cursor: 'pointer' }}
          />
          <textarea
            name="textInput"
            id="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </footer>
    </>
  );
}
