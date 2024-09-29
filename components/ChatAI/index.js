import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import ChatInputData from './ChatInputData';

const ChatAIComponent = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: 'ai' },
        { id: 2, text: "Hi! I have a question about React Native.", sender: 'user' },
        { id: 3, text: "Sure, I'd be happy to help. What's your question?", sender: 'ai' },
        { id: 4, text: "How do I implement a FlatList with custom styling?", sender: 'user' },
        { id: 5, text: "To implement a FlatList with custom styling, you can use the 'renderItem' prop and define your own component for each item. You can also use the 'contentContainerStyle' prop to style the overall list.", sender: 'ai' },
    ]);


    return (
        <View style={styles.container}>
            <SafeAreaView />
            <ScrollView contentContainerStyle={styles.messagesContainer}>
                {messages.map((message) => (
                    <View
                        key={message.id}
                        style={[
                            styles.messageBubble,
                            message.sender === 'user' ? styles.userMessage : styles.aiMessage,
                        ]}>
                        <Text style={styles.messageText}>{message.text}</Text>
                    </View>
                ))}
            </ScrollView>
            <ChatInputData />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    messagesContainer: {
        padding: 10,
    },
    messageBubble: {
        maxWidth: '70%',
        marginVertical: 5,
        borderRadius: 20,
        padding: 12,
    },
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#3498DB',
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#2C3E50',
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },

});

export default ChatAIComponent;