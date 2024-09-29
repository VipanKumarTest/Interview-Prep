import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ToastAndroid, StyleSheet, Animated, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { registerService } from '../../auth/AuthServices';

const Register = ({ navigation }) => {
    const [userData, setUserData] = useState({ email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleChange = (name, value) => {
        setUserData({ ...userData, [name]: value });
    };

    const handleRegister = async () => {
        if (!userData.email || !userData.password || !userData.confirmPassword) {
            ToastAndroid.show(`Enter all Details!`, ToastAndroid.SHORT);
            shakeInput();
            return;
        }
        if (userData.password !== userData.confirmPassword) {
            ToastAndroid.show(`Password didn't match!`, ToastAndroid.SHORT);
            shakeInput();
            return;
        }
        setLoading(true);
        try {
            const user = await registerService(userData.email, userData.password);
            if (user) {
                ToastAndroid.show(`Registration Successful!`, ToastAndroid.SHORT);
                navigation.navigate('LoginScreen', { navigation: navigation });
            }
            console.log(user);
            ToastAndroid.show(`Signup Success!`, ToastAndroid.SHORT);
        } catch (error) {
            console.log('Registration failed:', error);
            shakeInput();
        } finally {
            setLoading(false);
        }
    };

    const shakeInput = () => {
        Animated.sequence([
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })

        ]).start();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <LinearGradient
                colors={['#4A00E0', '#8E2DE2']}
                style={styles.gradient}
            >
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
                <Animated.View style={[styles.formContainer, { transform: [{ translateX: shakeAnimation }] }]}>
                    <Text style={styles.welcomeText}>Create Account</Text>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="#6B7280" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={(text) => handleChange('email', text)}
                            value={userData.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="lock-outline" size={24} color="#6B7280" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={(text) => handleChange('password', text)}
                            value={userData.password}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="lock-check-outline" size={24} color="#6B7280" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={(text) => handleChange('confirmPassword', text)}
                            value={userData.confirmPassword}
                            secureTextEntry={!showPassword}
                        />
                    </View>
                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <>
                                <Text style={styles.registerButtonText}>Register</Text>
                                <MaterialCommunityIcons name="account-plus" size={24} color="white" />
                            </>
                        )}
                    </TouchableOpacity>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    formContainer: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#4A00E0',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#F9FAFB',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#1F2937',
    },
    registerButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#4A00E0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    registerButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    loginText: {
        fontSize: 16,
        color: '#4B5563',
    },
    loginLink: {
        fontSize: 16,
        color: '#4A00E0',
        fontWeight: '600',
    },
});

export default Register;