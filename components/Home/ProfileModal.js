import React from 'react';
import { Alert, View, Text, StyleSheet, Modal, TouchableOpacity, ToastAndroid } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { logOutService } from '../../auth/AuthServices';

const ProfileModal = ({ visible, onClose, navigation }) => {
    const handleLogout = () => {
        ToastAndroid.show(`Logout Successful!`, ToastAndroid.SHORT);
        logOutService();
        navigation.navigate('LoginScreen');
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.option} >
                        <FontAwesome5 name="user" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.optionText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} >
                        <Ionicons name="settings-outline" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.optionText}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={handleLogout} >
                        <MaterialIcons name="logout" size={20} color="#FF3B30" style={styles.icon} />
                        <Text style={[styles.optionText, { color: '#FF3B30' }]}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    icon: {
        marginRight: 15,
    },
    optionText: {
        fontSize: 18,
        color: '#333',
    },
});

export default ProfileModal;