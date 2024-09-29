import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from '../../utils/colors';

const BottomNavBar = ({ state, descriptors, navigation }) => {
    const tabs = [
        { name: 'HomeScreen', icon: 'home', title: 'Home' },
        { name: 'BookmarkScreen', icon: 'compass', title: 'Explore' },
        { name: 'ProfileScreen', icon: 'person', title: 'Profile' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                const isFocused = state.routes[state.index].name === tab.name;
                const animatedValue = new Animated.Value(isFocused ? 1 : 0);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: tab.name,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        Animated.spring(animatedValue, {
                            toValue: 1,
                            useNativeDriver: true,
                        }).start();
                        navigation.navigate(tab.name);
                    }
                };

                const scale = animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.2],
                });

                return (
                    <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={onPress}
                        activeOpacity={0.7}
                    >
                        <Animated.View style={[styles.iconContainer, { transform: [{ scale }] }]}>
                            {tab.icon === "robot" ? (
                                <MaterialCommunityIcons
                                    name={isFocused ? tab.icon : `${tab.icon}-outline`}
                                    size={24}
                                    color={isFocused ? colors.primary : colors.grey}
                                />
                            ) : (
                                <Ionicons
                                    name={isFocused ? tab.icon : `${tab.icon}-outline`}
                                    size={24}
                                    color={isFocused ? colors.primary : colors.grey}
                                />
                            )}
                        </Animated.View>
                        <Animated.Text
                            style={[
                                styles.tabTitle,
                                {
                                    color: isFocused ? colors.primary : colors.grey,
                                    opacity: animatedValue,
                                },
                            ]}
                        >
                            {tab.title}
                        </Animated.Text>
                        {isFocused && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 4,
    },
    tabTitle: {
        fontSize: 12,
        fontWeight: '600',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        width: 30,
        height: 3,
        backgroundColor: colors.primary,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
});

export default BottomNavBar;