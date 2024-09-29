import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AIChatButton = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('AIChatScreen');
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.buttonContainer}>
            <LinearGradient
                colors={['#6A11CB', '#2575FC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gradient}
            >
                <View style={styles.contentContainer}>
                    <Ionicons name="chatbubble-ellipses" size={24} color="white" />
                    <Text style={styles.buttonText}>Chat with AI</Text>
                </View>
                <View style={styles.arrowContainer}>
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: "90%",
        alignSelf: 'center',
        marginTop: 20,
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    arrowContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 5,
    },
});

export default AIChatButton;