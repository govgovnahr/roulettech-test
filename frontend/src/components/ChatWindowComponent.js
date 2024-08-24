import React, {useState} from 'react'
import axios from 'axios'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator} from "@chatscope/chat-ui-kit-react"

const ChatWindowComponent = () => {
    const [context, setContext] = useState([])
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState([]);
    
    const handleSend = async (message) => {
        console.log(messages)
        const newMessage = {
            sender: 'user',
            message: message,
            direction: 'outgoing',
            };
        const temp = [...messages, newMessage]
        setMessages(temp)
        console.log("Messages" , messages)
        setLoading(true)
        await getMessage(message)
        setLoading(false)
    };

    const getMessage = async (message) => {
        axios.post('http://localhost:8000/chatbot/', {message: message})
        .then (res => {
            console.log(res)
            const newMessage = {sender:'assistant', message: res.data.message, direction: 'incoming'}
            setMessages(prevMessages => [...prevMessages, newMessage])
            console.log(messages)
        })
        .catch((error)=>console.log(error))
    }

    return (
        <div className='chatWindow' style={{ position:"relative", height: '50vh'}}>
        <MainContainer>
            <ChatContainer>
                <MessageList 
                    scrollBehavior="smooth" 
                    typingIndicator={loading ? <TypingIndicator content="KangaGPT is typing" /> : null}
                >
                    {messages.map((message, i) => {
                    console.log(message)
                    return <Message key={i} model={message} />
                    })}
                </MessageList>
                <MessageInput placeholder="Type message here" onSend={handleSend} />        
            </ChatContainer>
        </MainContainer>
        </div>
    )

}

export default ChatWindowComponent;