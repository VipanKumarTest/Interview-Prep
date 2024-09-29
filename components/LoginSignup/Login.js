import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Image, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { loginService } from '../../auth/AuthServices';
import { ActivityIndicator } from 'react-native-paper';


const Login = ({ navigation }) => {
    const [credential, setCredential] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const handleChange = (name, value) => {
        setCredential({ ...credential, [name]: value });
    };

    const signInWithEmail = async () => {
        if (!credential.email || !credential.password) {
            ToastAndroid.show(`Enter all Details!`, ToastAndroid.SHORT);
            shakeInput();
            return;
        }
        setLoading(true);
        try {
            const user = await loginService(credential.email, credential.password);
            if (user) {
                ToastAndroid.show(`Login Success!`, ToastAndroid.SHORT);
                navigation.navigate('HomeScreen');
            }
            console.log(user);
        } catch (error) {
            console.log('Login failed:', error);
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
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name="email-outline" size={24} color="#6B7280" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#9CA3AF"
                            onChangeText={(text) => handleChange('email', text)}
                            value={credential.email}
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
                            value={credential.password}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <MaterialCommunityIcons name={showPassword ? "eye-off" : "eye"} size={24} color="#6B7280" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.loginButton} onPress={signInWithEmail} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <>
                                <Text style={styles.loginButtonText}>Login</Text>
                                <MaterialCommunityIcons name="login" size={24} color="white" />
                            </>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen', { navigation: navigation })}>
                            <Text style={styles.signupLink}>Sign up</Text>
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
        width: 120,
        height: 120,
        marginBottom: 30,
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
    loginButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#4A00E0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginRight: 10,
    },
    forgotPassword: {
        marginTop: 20,
    },
    forgotPasswordText: {
        color: '#4A00E0',
        fontSize: 16,
        fontWeight: '500',
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 30,
    },
    signupText: {
        fontSize: 16,
        color: '#4B5563',
    },
    signupLink: {
        fontSize: 16,
        color: '#4A00E0',
        fontWeight: '600',
    },
});

export default Login;