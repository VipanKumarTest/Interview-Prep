import React, { useState, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import QuestionList from '../Questions';


const Bookmarks = () => {

    return (
        <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Saved Questions</Text>
            <QuestionList radius={10} />
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