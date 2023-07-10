import logo from './logo.svg';
import './App.css';
import './normalize.css'
import Spinner from './components/Spinner.js'
import Dblogo from './components/Dblogo.js';

import { useState, useEffect ,useRef} from 'react';


function App() {

  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: "How I can help you today?",
    links: []
  }
  ]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatLogRef = useRef(null);

  //clear chats
  const clearChat = () => {
    setChatLog([]);
  }

  //AutoScroll
  const scrollContainerToBottom = () => {
    console.log("Here")
    if (chatContainerRef.current) {
      console.log(chatContainerRef.current.scrollHeight)
      chatContainerRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollContainerToBottom();
  }, []);

  async function handleSubmit(e){
    
    // Prevent the default form submission behavior
    e.preventDefault();
    // Add the user's input to the chat log
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    // Clear the input field
    await setInput("");
    // Update the chat log state
    await setChatLog(chatLogNew);
    // Send a POST request to the local server with the chat log and the current model

    setLoading(true);

    const response = await fetch("http://localhost:3080", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: input,
      }),
    });
    
    // Update the chat log with the response from the server
    const data = await response.json();
    await setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` , links: `${data.links}`}]);
    await setLoading(false);
    await scrollContainerToBottom();
  }

  return (
    <div className="App">
      <aside className="sidemenu">
       <div class="side-logo">
          <Dblogo/>
          Deutsche Bank Chat
      </div>
      </aside>

      <section ref={chatContainerRef}  className='chatbox'>
      <div ref={chatLogRef} className="chat-log">
      {
      chatLog.map((message, index) => (
            <ChatMessage key={index} message={message}/>
          ))}

      </div>
      </section>

      <section className="chat-input">
      <div className="chat-input-holder">
      <button className="custom-button" onClick={clearChat}>Regenerate Answer</button>
        {
        loading ?
            <Spinner/>
            : 
            <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
            ></input>
          </form>
        }
        </div>
      </section>
    </div>
  );
}


// Define a functional component to render a chat message
const ChatMessage = ({ message}) => {
  console.log("links -------<<<<<<<<< ",message.links)
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" && (
            <Dblogo></Dblogo>
          )}

          {message.user === "me" && (
             <Dblogo></Dblogo>
          )
          }
        </div>
        <div className="message">{message.message}</div>
        </div>

        <div className="links">
        {typeof message.links === 'string' && message.user === "gpt" ? 
        message.links.split(',').map((link, index) => (
          <div>
          Relevant Link:
          <div key={index}> <a href={link} target="_blank"><b>{link}</b></a> </div>
          </div>
        ))
        :""}
      </div>
    </div>
  );
};

export default App;
