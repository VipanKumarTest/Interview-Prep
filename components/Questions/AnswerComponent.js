import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const AnswerComponent = (props) => {
    const [answer, setAnswer] = useState("Kotlin is a modern, expressive, and safe programming language developed by JetBrains. It is fully interoperable with Java and runs on the Java Virtual Machine (JVM). Kotlin is designed to be more concise and safer than Java, while still maintaining full compatibility with Java code.");
    const [isListening, setIsListening] = useState(false);
    const [recognizedText, setRecognizedText] = useState('');
    const route = useRoute();
    const { question, questionIndex } = route.params;

    console.log('Question:', question);
    console.log('Question Index:', questionIndex);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const handleEdit = () => {
        console.log("Edit button pressed");
        // Implement edit functionality
    };

    const handleRegenerate = () => {
        console.log("Regenerate button pressed");
        // Implement regenerate functionality
    };

    const handleSpeak = () => {
        console.log("Speak button pressed");
        // Implement text-to-speech functionality
    };

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
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <LinearGradient
                    colors={['#4A00E0', '#8E2DE2']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.headerGradient}
                >
                    <Text style={styles.title}>AI Generated Answer</Text>
                </LinearGradient>

                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.questionContainer}>
                            <Title style={styles.questionText}>{question}</Title>
                        </View>
                        <View style={styles.separator} />
                        <Title style={styles.answerTitle}>Answer:</Title>
                        <Paragraph style={styles.answerText}>{answer}</Paragraph>
                        <View style={styles.iconContainer}>
                            <IconButton
                                icon="pencil"
                                color="#4A00E0"
                                size={24}
                                onPress={handleEdit}
                            />
                            <IconButton
                                icon="refresh"
                                color="#4A00E0"
                                size={24}
                                onPress={handleRegenerate}
                            />
                            <IconButton
                                icon="volume-high"
                                color="#4A00E0"
                                size={24}
                                onPress={handleSpeak}
                            />
                        </View>
                    </Card.Content>
                </Card>

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
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollView: {
        flexGrow: 1,
        position: 'relative'
    },
    headerGradient: {
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        color: '#ffffff',
        textAlign: 'center',
    },
    card: {
        margin: 16,
        borderRadius: 16,
        elevation: 4,
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    questionText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        color: '#333',
        flex: 1,
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: 8,
        justifyContent: 'flex-end',
    },
    separator: {
        height: 1,
        backgroundColor: '#E0E0E0',
        marginVertical: 16,
    },
    answerTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        color: '#4A00E0',
        marginBottom: 8,
    },
    answerText: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#E0E5E9',
        backgroundColor: 'white',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
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
        backgroundColor: '#3498DB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButton: {
        marginLeft: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#2ECC71',
        borderRadius: 25,
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AnswerComponent;