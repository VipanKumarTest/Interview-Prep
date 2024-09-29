import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async () => {
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        setIsLoading(true);
        try {
            console.log('Password reset email sent to:', email);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to send reset email:', error);
            setIsLoading(false);
            alert('Failed to send reset email. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* <Image
                source={require('../../assets/forgot-password.png')}
                style={styles.image}
                resizeMode="contain"

            /> */}

            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
                Don't worry! It happens. Please enter the email address associated with your account.
            </Text>

            <View style={styles.inputContainer}>
                <Feather name="mail" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#888"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <TouchableOpacity
                style={styles.resetButton}
                onPress={handleResetPassword}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.resetButtonText}>Reset Password</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.backToLoginButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    image: {
        width: '80%',
        height: 200,
        alignSelf: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 14,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: '#333',
    },
    resetButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backToLoginButton: {
        alignItems: 'center',
    },
    backToLoginText: {
        color: '#4A90E2',
        fontSize: 16,
    },
});

export default ForgotPasswordScreen;