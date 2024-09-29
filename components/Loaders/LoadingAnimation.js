import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const LoadingAnimation = ({ size = 100, color = '#3498db' }) => {
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 1000,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(rotateAnim, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [pulseAnim, rotateAnim]);

    const scale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
    });

    const opacity = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.6, 1],
    });

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        borderColor: color,
                        transform: [{ scale }],
                        opacity,
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.arc,
                    {
                        width: size + 20,
                        height: size + 20,
                        borderRadius: (size + 20) / 2,
                        borderColor: color,
                        transform: [
                            { rotate },
                            { translateX: -10 },
                            { translateY: -10 },
                        ],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        borderWidth: 4,
        borderColor: '#3498db',
    },
    arc: {
        position: 'absolute',
        borderWidth: 4,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
    },
});

export default LoadingAnimation;