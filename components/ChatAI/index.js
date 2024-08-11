import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    SafeAreaView,
} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatAIComponent = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: 'ai' },
        { id: 2, text: "Hi! I have a question about React Native.", sender: 'user' },
        { id: 3, text: "Sure, I'd be happy to help. What's your question?", sender: 'ai' },
        { id: 4, text: "How do I implement a FlatList with custom styling?", sender: 'user' },
        { id: 5, text: "To implement a FlatList with custom styling, you can use the 'renderItem' prop and define your own component for each item. You can also use the 'contentContainerStyle' prop to style the overall list.", sender: 'ai' },
    ]);
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');

    const sendMessage = () => {
        if (recognizedText.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: prevMessages.length + 1, text: recognizedText, sender: 'user' }
            ]);
            setRecognizedText('');
        }
    };

    const startListening = () => {
        setIsListening(true);
        // Implement voice recognition logic here
    };

    const stopListening = () => {
        setIsListening(false);
        // Implement stop listening logic here
    };

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
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type your message..."
                    value={recognizedText}
                    onChangeText={text => setRecognizedText(text)}
                />
                <TouchableOpacity
                    onPress={() => (isListening ? stopListening() : startListening())}
                    style={styles.voiceButton}>
                    {isListening ? (
                        <Text style={styles.voiceButtonText}>•••</Text>
                    ) : (
                        <View style={styles.microphoneContainer}>
                            <FontAwesome name="microphone" size={24} color="white" />
                        </View>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Ionicons style={styles.sendButtonText} name="send" size={24} />
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#3498DB', // Bright blue for user messages
    },
    aiMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#2C3E50', // Dark blue-gray for AI messages
    },
    messageText: {
        color: 'white',
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#E0E5E9',
        backgroundColor: 'white',
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#F0F4F8',
        color: '#2C3E50',
    },
    voiceButton: {
        marginLeft: 10,
    },
    voiceButtonText: {
        fontSize: 24,
        width: 45,
        height: 45,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#3498DB',
    },
    microphoneContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        overflow: 'hidden',
        backgroundColor: '#3498DB', // Bright blue for microphone button
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#2ECC71', // Green for send button
        borderRadius: 25,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ChatAIComponent;