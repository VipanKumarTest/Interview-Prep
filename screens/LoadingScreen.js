import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingAnimation from '../components/Loaders/LoadingAnimation';
const LoadingScreen = () => {
    return (
        <View style={styles.container}>
            <LoadingAnimation size={120} color="#3498db" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
});

export default LoadingScreen;