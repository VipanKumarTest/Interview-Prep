import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ProfileModal from './ProfileModal';

const Header = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.header}
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.headerContent}>
                <View>
                    <Text style={styles.headerText}>AI Interview Prep</Text>
                    <Text style={styles.subHeaderText}>Your Personal Assistant</Text>
                </View>
                <TouchableOpacity style={styles.profileButton} onPress={() => setModalVisible(true)}>
                    <Ionicons name="person-circle-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
            <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    subHeaderText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        marginTop: 5,
    },
    profileButton: {
        padding: 5,
    },
});

export default Header;