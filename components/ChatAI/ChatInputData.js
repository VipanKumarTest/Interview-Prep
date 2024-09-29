import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ChatInputData = () => {
    const [recognizedText, setRecognizedText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const startListening = () => {
        setIsListening(true);
        // Implement voice recognition logic here
    };

    const stopListening = () => {
        setIsListening(false);
        // Implement stop listening logic here
    };

    const sendMessage = () => {
        if (recognizedText.trim()) {
            console.log(recognizedText);
            setRecognizedText('');
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Ask AI anything..."
                placeholderTextColor="#A0AEC0"
                value={recognizedText}
                onChangeText={text => setRecognizedText(text)}
            />
            <TouchableOpacity
                onPress={() => (isListening ? stopListening() : startListening())}
                style={styles.voiceButton}>
                <LinearGradient
                    colors={['#6A11CB', '#2575FC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                >
                    {isListening ? (
                        <FontAwesome name="stop-circle" size={24} color="white" />
                    ) : (
                        <FontAwesome name="microphone" size={24} color="white" />
                    )}
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                <LinearGradient
                    colors={['#6A11CB', '#2575FC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradientButton}
                >
                    <Ionicons name="send" size={24} color="white" />
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#E2E8F0',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 12,
        borderRadius: 25,
        backgroundColor: '#F7FAFC',
        color: '#2D3748',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    voiceButton: {
        marginRight: 10,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradientButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default ChatInputData;