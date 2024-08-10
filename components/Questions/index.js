import React from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../Home/Header';
import questions from '../../utils/data'
import colors from '../../utils/colors';

const QuestionList = () => {
    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => console.log(`Question ${index + 1} pressed`)}>
            <Card style={styles.card}>
                <Card.Content>
                    <View style={styles.questionHeader}>
                        <Icon name="help-circle-outline" size={24} color={colors.primary} />
                        <Title style={styles.questionNumber}>Question {index + 1}</Title>
                    </View>
                    <Paragraph style={styles.questionText}>{item}</Paragraph>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <FlatList
                data={questions}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6200ee',
        textAlign: 'center',
        marginVertical: 20,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 70
    },
    card: {
        marginBottom: 16,
        backgroundColor: '#ffffff',
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    questionNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginLeft: 8,
    },
    questionText: {
        fontSize: 16,
        color: '#333333',
        lineHeight: 24,
    },
});

export default QuestionList;