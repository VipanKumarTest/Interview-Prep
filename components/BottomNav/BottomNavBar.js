import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../utils/colors';

const BottomNavBar = ({ navigation, activeTab, onTabPress }) => {
    const tabs = [
        { name: 'Home', icon: 'home-outline', screen: 'Home' },
        { name: 'Explore', icon: 'compass-outline', screen: 'QuestionsScreen' },
        { name: 'Create', icon: 'add', screen: 'InputFormScreen' },
        { name: 'Stats', icon: 'stats-chart-outline', screen: 'PremiumScreen' },
        { name: 'Profile', icon: 'person-outline', screen: 'ProfilePageScreen' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab.name}
                    style={[
                        styles.tab,
                        tab.name === 'Create' && styles.createTab,
                    ]}
                    onPress={() => onTabPress(tab.name, tab.screen)}
                >
                    {tab.name === 'Create' ? (
                        <View style={styles.createButton}>
                            <Ionicons name={tab.icon} size={32} color="#FFFFFF" />
                        </View>
                    ) : (
                        <>
                            <Ionicons
                                name={tab.icon}
                                size={24}
                                color={activeTab === tab.name ? colors.primary : '#888'}
                            />
                            {activeTab === tab.name && <View style={styles.activeIndicator} />}
                        </>
                    )}
                </TouchableOpacity>
            ))}
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
    createTab: {
        justifyContent: 'flex-start',
    },
    createButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -30,
        shadowColor: '#4facfe',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 6,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#4facfe',
    },
});

export default BottomNavBar;