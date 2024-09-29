import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import QuestionList from '../Questions';
import { UserContext } from '../../context/userContextProvider';
import SavedQuestion from '../Questions/SavedQuestions';

const Bookmarks = ({ navigation }) => {
    const { aboutUserInfo } = useContext(UserContext);
    const [bookmark, setBookmark] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(null);

    useEffect(() => {
        if (aboutUserInfo["bookmarks"].includes(questionIndex)) {
            setBookmark(true);
        }
    }, [aboutUserInfo])


    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Saved Questions</Text>
            <SavedQuestion navigation={navigation} radius={10} bookmarkIndex={aboutUserInfo["bookmarks"]} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4c669f',
        marginBottom: 10,
        textAlign: 'center',
    },

});

export default Bookmarks;