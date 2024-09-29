import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Card, Title, Paragraph, IconButton } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { UserContext } from '../../context/userContextProvider';
import geminiAI from '../../gemini/config';
import ChatInputData from '../ChatAI/ChatInputData';
import AiGenerateButton from '../ChatAI/AiGenerateButton';
// import questionContext from '../../utils/questionContext';

const AnswerComponent = (props) => {
    const { aboutUserInfo, setAboutUserInfo } = useContext(UserContext);
    const [answer, setAnswer] = useState('');
    const [bookmark, setBookmark] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();
    const { question, questionIndex } = route.params;

    // console.log(questionContext);

    useEffect(() => {
        if (aboutUserInfo["bookmarks"].includes(questionIndex)) {
            setBookmark(true);
        }
    }, [aboutUserInfo])

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

    const addBookmark = () => {
        setAboutUserInfo(prevState => ({
            ...prevState,
            bookmarks: [...prevState.bookmarks, questionIndex]
        }));

    };

    const handleAIResponse = async () => {
        setIsLoading(true);
        // try {
        //     const geminiAnswer = await geminiAI.run(aboutUserInfo, 'according to the given details give me a perfect answer for my Interview preparation of ', question);
        //     setAnswer(geminiAnswer);
        // } catch (error) {
        //     console.error("Error fetching AI response:", error);
        //     setAnswer("Sorry, there was an error generating the answer. Please try again.");
        // } finally {
        //     setIsLoading(false);
        // }
    }

    const removeBookmark = () => {
        setAboutUserInfo(prevState => ({
            ...prevState,
            bookmarks: prevState.bookmarks.filter(b => b !== questionIndex)
        }));
    };

    const handleBookmark = () => {
        if (!bookmark) {
            addBookmark();
        } else {
            removeBookmark();
        }
        setBookmark(!bookmark);
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
                            <TouchableOpacity onPress={handleBookmark}>
                                {bookmark ? <Ionicons name="bookmark" size={24} color="black" /> : <Ionicons name="bookmark-outline" size={24} color="black" />}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.separator} />
                        <Title style={styles.answerTitle}>Answer:</Title>
                        <Paragraph style={styles.answerText}>{answer}</Paragraph>

                        <AiGenerateButton handleAIResponse={handleAIResponse} />

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

                <ChatInputData />
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
        marginBottom: 84,
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
});

export default AnswerComponent;