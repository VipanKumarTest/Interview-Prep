import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../utils/colors';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const BottomNavBar = ({ state, descriptors, navigation }) => {
    const tabs = [
        { name: 'HomeScreen', icon: 'home-outline', title: 'Home' },
        { name: 'BookmarkScreen', icon: 'compass-outline', title: 'Bookmark' },
        { name: 'AIChatScreen', icon: 'robot-happy-outline', title: 'AI' },
        { name: 'ProfileScreen', icon: 'person-outline', title: 'Profile' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab, index) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: tab.name,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(tab.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={tab.name}
                        style={styles.tab}
                        onPress={onPress}
                    >
                        {tab.icon == "robot-happy-outline" ? (<MaterialCommunityIcons name={tab.icon} size={24} color={isFocused ? colors.primary : 'black'} />)
                            : (<Ionicons
                                name={tab.icon}
                                size={24}
                                color={isFocused ? colors.primary : 'black'}
                            />)}
                        {isFocused ? <Text style={styles.activeIndicator}>{tab.title}</Text> : <Text >{tab.title}</Text>}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
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
    activeIndicator: {
        color: colors.primary,
    },
});

export default BottomNavBar;