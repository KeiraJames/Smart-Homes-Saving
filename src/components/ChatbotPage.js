import React, { useState, useEffect, useRef } from 'react';
//import 'dotenv'

const GEMINI_API_KEY = 0;// = process.env.REACT_APP_GEM_API;

const ChatbotPage = ({ onBack }) => {
  const [conversation, setConversation] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userMessage = { role: 'user', parts: [{ text: userInput }] };
    setConversation((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const res = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are EcoVolt AI, a friendly and helpful assistant for a smart home energy savings app. Your goal is to provide practical, easy-to-understand tips for conserving energy and reducing electricity costs. Do not go off-topic. Keep your answers concise and encouraging.\n\nUser: ${userInput}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const text =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I couldn’t get a response.';

      const modelMessage = { role: 'model', parts: [{ text }] };
      setConversation((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error('Error with Gemini API:', error);
      const errorMessage = {
        role: 'model',
        parts: [
          {
            text: "Sorry, I'm having trouble connecting to the AI assistant right now.",
          },
        ],
      };
      setConversation((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper chatbot-page">
      <header className="chart-header">
        <button
          onClick={onBack}
          className="back-button"
          style={{ position: 'static' }}
        >
          &lt; Back
        </button>
        <h2>EcoVolt AI Assistant</h2>
      </header>

      <div className="chat-window">
        <div className="chat-message model">
          <p>Hi! I'm EcoVolt AI. How can I help you save energy today?</p>
        </div>

        {conversation.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.role}`}>
            <p>{msg.parts[0].text}</p>
          </div>
        ))}

        {isLoading && (
          <div className="chat-message model">
            <p>Thinking...</p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form className="chat-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="auth-input"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask for an energy-saving tip..."
          disabled={isLoading}
        />
        <button type="submit" className="cta-button" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotPage;
