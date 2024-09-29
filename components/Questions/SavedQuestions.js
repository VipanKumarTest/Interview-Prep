import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import questions from '../../utils/data';
import { UserContext } from '../../context/userContextProvider';
import PQValidation from './PremiumQuestions';

const SavedQuestion = ({ navigation, radius, bookmarkIndex }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredQuestions, setFilteredQuestions] = useState(questions);
    const { aboutUserInfo } = useContext(UserContext);
    const [modalVisible, setModalVisible] = useState(false);

    const savedQueList = bookmarkIndex.map(index => filteredQuestions[index]);

    useEffect(() => {
        const filtered = questions.filter((question) =>
            question.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredQuestions(filtered);
    }, [searchText]);

    const isProfileIncomplete = () => {
        return !aboutUserInfo?.skills.length || !aboutUserInfo?.education.length || !aboutUserInfo?.workExperience.length;
    };

    const handleQuestionPress = (item, index) => {
        if (isProfileIncomplete()) {
            setModalVisible(true);
        } else {
            navigation.navigate("AnswerScreenScreen", {
                question: item,
                questionIndex: index
            });
        }
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            style={styles.questionCard}
            onPress={() => handleQuestionPress(item, index)}
        >
            <View style={styles.questionHeader}>
                <View style={styles.questionNumberContainer}>
                    <Text style={styles.questionNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.questionText}>{item}</Text>
            </View>
            {isProfileIncomplete() ? (
                <View style={styles.lockIconContainer}>
                    <Ionicons name="lock-closed" size={20} color="#ffce1b" />
                </View>
            ) : (
                <Ionicons name="chevron-forward" size={24} color="#4c669f" />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.searchContainer, { borderRadius: radius }]}>
                <Ionicons name="search" size={20} color="#777" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder='Search questions...'
                    placeholderTextColor="#999"
                />
            </View>
            <FlatList
                data={savedQueList}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <PQValidation modalVisible={modalVisible} setModalVisible={setModalVisible} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 16,
        paddingHorizontal: 15,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 12,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 70
    },
    questionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
    },
    questionHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    questionNumberContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#4c669f',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    questionNumber: {
        color: 'white',
        fontWeight: 'bold',
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    lockIconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f2f5',
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default SavedQuestion;