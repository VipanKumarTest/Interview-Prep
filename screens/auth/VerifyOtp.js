import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const VerifyOTPScreen = ({ route, navigation }) => {
    const { phoneNumber } = '+0000000000';
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [shake] = useState(new Animated.Value(0));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleOtpChange = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            this[`otpInput${index + 1}`].focus();
        }
    };

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join('');
        if (enteredOTP.length === 6) {
            // Implement your OTP verification logic here
            console.log('Verifying OTP:', enteredOTP);
            navigation.navigate('HomeScreen');
        } else {
            shakeAnimation();
        }
    };

    const shakeAnimation = () => {
        Animated.sequence([
            Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shake, { toValue: -10, duration: 100, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 10, duration: 100, useNativeDriver: true }),
            Animated.timing(shake, { toValue: 0, duration: 100, useNativeDriver: true })
        ]).start();
    };

    const handleResendOTP = () => {
        // Implement your resend OTP logic here
        console.log('Resending OTP');
        setTimer(30);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Verify OTP</Text>
            </View>

            <Text style={styles.instruction}>
                Enter the 6-digit code sent to {phoneNumber}
            </Text>

            <Animated.View style={[styles.otpContainer, { transform: [{ translateX: shake }] }]}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={(input) => { this[`otpInput${index}`] = input; }}
                        style={styles.otpInput}
                        value={digit}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </Animated.View>

            <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
                <Text style={styles.verifyButtonText}>Verify</Text>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the code? </Text>
                {timer > 0 ? (
                    <Text style={styles.timerText}>{`Resend in ${timer}s`}</Text>
                ) : (
                    <TouchableOpacity onPress={handleResendOTP}>
                        <Text style={styles.resendButton}>Resend OTP</Text>
                    </TouchableOpacity>
                )}
            </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    instruction: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#3498db',
        borderRadius: 10,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#fff',
    },
    verifyButton: {
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    verifyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    resendText: {
        color: '#666',
    },
    timerText: {
        color: '#3498db',
    },
    resendButton: {
        color: '#3498db',
        fontWeight: 'bold',
    },
});

export default VerifyOTPScreen;