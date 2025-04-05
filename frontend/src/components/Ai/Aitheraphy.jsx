import React, { useState, useEffect, useRef } from 'react';
import Loader from 'react-js-loader';
import applogo from '../../assets/applogo.png'; // Import your app logo
import Navbar from '../navbar/Navbar';

const Aitheraphy = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello, I’m Serai, your AI therapist. How are you feeling today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null); // Ref for auto-scrolling

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173', // replace with your actual domain if deploying
          'X-Title': 'Serai - AI Therapist',
        },
        body: JSON.stringify({
            model: "anthropic/claude-3-haiku",
          messages: [
            {
              role: 'system',
              content:
                "You are Serai , flirty AI therapist who chats casually like a real human. Keep replies very short, and filled with emojis 🧠💖😜. Always be fun, human-like, and speak like you're texting a close friend and the user should feel like thy are talking to an arrogant but sassy lady boss .",
            },
            ...newMessages,
          ],
        }),
      });

      const data = await res.json();
      console.log("🧠 OpenRouter Response:", data);
      // Safety check
if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
    const aiReply = data.choices[0].message.content;
    setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
  } else {
    console.warn("⚠️ Unexpected response:", data);
    setMessages([...newMessages, { role: 'assistant', content: 'The AI had nothing to say 🥲' }]);
  }

      
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { role: 'assistant', content: 'Something went wrong. Please try again later.' },
      ]);
    }

    setLoading(false);
  };

  // Auto-scroll to the bottom of the chat box
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <>
    <Navbar/>
    <div className="relative flex justify-center items-center min-h-screen mt-10 overflow-hidden">
      {/* Polygon Gradient Background */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>

      <div className="w-full max-w-3xl p-6 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl shadow-lg">
        <ChatComponent
          messages={messages}
          input={input}
          setInput={setInput}
          loading={loading}
          sendMessage={sendMessage}
          chatBoxRef={chatBoxRef}
        />
      </div>
      <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
    </div>
    </>
  );
};

const ChatComponent = ({ messages, input, setInput, loading, sendMessage, chatBoxRef }) => (
  <>
    {/* AI Description */}
    <div className="text-center mb-6 flex items-center justify-center gap-3 pr-7">
      <img src={applogo} alt="App Logo" className="h-10 w-10" />
      <h2 className="text-4xl font-extrabold text-pink-400">Serai</h2>
    </div>

    {/* Chat Box */}
    <div
      ref={chatBoxRef}
      className="flex flex-col gap-4 p-4 bg-gray-700 rounded-lg shadow-inner overflow-y-auto max-h-[400px] h-[400px]"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`p-3 rounded-lg text-sm ${
            msg.role === 'user'
              ? 'bg-gradient-to-r from-blue-900 to-pink-400 text-white self-end'
              : 'bg-gray-600 text-gray-200 self-start'
          }`}
        >
          {msg.content}
        </div>
      ))}
      {loading && (
        <div className="flex items-center gap-2 text-gray-400">
          <Loader type="spinner-default" bgColor="#ff80b5" color="#ff80b5" size={30} />
          <span>Typing...</span>
        </div>
      )}
    </div>

    {/* Input Box */}
    <div className="mt-6 flex items-center gap-4">
      <input
        type="text"
        placeholder="Tell me what's on your mind..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        className="flex-1 px-4 py-3 rounded-lg bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      />
      <button
        onClick={sendMessage}
        className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-lg hover:scale-105 hover:shadow-lg transition"
      >
        Send
      </button>
    </div>
  </>
);

export default Aitheraphy;
