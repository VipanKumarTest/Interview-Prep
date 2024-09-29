import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../../context/userContextProvider';
import { addOrUpdateUser } from '../../firebase/firestoreAPIs';

const EditProfile = () => {
    const { aboutUserInfo, setAboutUserInfo } = useContext(UserContext);
    const [userData, setUserData] = useState({
        uid: '',
        name: '',
        username: '',
        email: '',
        phone: '',
        location: '',
        professionalTitle: '',
        summary: '',
        workExperience: [],
        education: [],
        skills: [],
        certifications: [],
        bookmarks: []
    });

    useEffect(() => {
        if (aboutUserInfo && aboutUserInfo.uid) {
            setUserData(aboutUserInfo);
        }
    }, [aboutUserInfo]);

    useEffect(() => {
        setUserData(aboutUserInfo);
        console.log('Saving aboutUserInfo data:', aboutUserInfo);

    }, [aboutUserInfo])

    const handleSave = async () => {
        try {
            await addOrUpdateUser(userData.uid, userData);
            setAboutUserInfo(userData);
            Alert.alert('Success', 'Profile saved successfully!');
        } catch (error) {
            console.error('Error saving profile: ', error);
            Alert.alert('Error', 'Failed to save profile. Please try again.');
        }
    };

    const fieldConfigs = {
        workExperience: [
            { key: 'company', placeholder: 'Company Name' },
            { key: 'position', placeholder: 'Position' },
            { key: 'startDate', placeholder: 'Start Date' },
            { key: 'endDate', placeholder: 'End Date' },
            { key: 'description', placeholder: 'Job Description', multiline: true }
        ],
        education: [
            { key: 'college', placeholder: 'College/University Name' },
            { key: 'course', placeholder: 'Course' },
            { key: 'branch', placeholder: 'Branch/Major' },
            { key: 'startYear', placeholder: 'Start Year' },
            { key: 'graduationYear', placeholder: 'Graduation Year' },
            { key: 'otherDetails', placeholder: 'Other Details', multiline: true }
        ],
        certifications: [
            { key: 'name', placeholder: 'Certification Name' },
            { key: 'issuingOrganization', placeholder: 'Issuing Organization' },
            { key: 'issueDate', placeholder: 'Issue Date' },
            { key: 'expirationDate', placeholder: 'Expiration Date (if applicable)' },
            { key: 'credentialID', placeholder: 'Credential ID (if applicable)' }
        ]
    };

    const addField = (field) => {
        const newItem = fieldConfigs[field].reduce((acc, config) => {
            acc[config.key] = '';
            return acc;
        }, { id: Date.now().toString() });

        setUserData(prevState => ({
            ...prevState,
            [field]: [...prevState[field], newItem]
        }));
    };

    const updateField = (field, index, key, value) => {
        setUserData(prevState => ({
            ...prevState,
            [field]: prevState[field].map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            )
        }));
    };

    const removeField = (field, index) => {
        setUserData(prevState => ({
            ...prevState,
            [field]: prevState[field].filter((_, i) => i !== index)
        }));
    };

    const renderInputField = (iconName, placeholder, value, onChangeText) => (
        <View style={styles.fieldContainer}>
            <Ionicons name={iconName} size={24} color="#4c669f" style={styles.icon} />
            <TextInput
                style={styles.fieldInput}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    );

    const renderMultiField = (title, field) => (
        <View style={styles.multiFieldContainer}>
            <Text style={styles.multiFieldTitle}>{title}</Text>
            {userData[field].map((item, index) => (
                <View key={item.id} style={styles.multiFieldItem}>
                    {fieldConfigs[field].map(config => (
                        <TextInput
                            key={config.key}
                            style={[
                                styles.multiFieldInput,
                                config.multiline && styles.multilineInput
                            ]}
                            value={item[config.key]}
                            onChangeText={(text) => updateField(field, index, config.key, text)}
                            placeholder={config.placeholder}
                            multiline={config.multiline}
                        />
                    ))}
                    <TouchableOpacity onPress={() => removeField(field, index)} style={styles.removeButton}>
                        <Ionicons name="close-circle" size={24} color="#ff6b6b" />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity onPress={() => addField(field)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add {title}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <ScrollView style={styles.scrollView}>
            <LinearGradient
                colors={['#4e54c8', '#8f94fb']}
                style={styles.headerGradient}
            >
                <View style={styles.headerContent}>
                    <Image
                        source={require('../../assets/profile.png')}
                        style={styles.profileImage}
                    />
                    <TouchableOpacity style={styles.changePhotoButton}>
                        <Ionicons name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View style={styles.container}>
                <View style={styles.card}>
                    {renderInputField("person-outline", "Name", userData.name, (text) => setUserData({ ...userData, name: text }))}
                    {renderInputField("at-outline", "Username", userData.username, (text) => setUserData({ ...userData, username: text }))}
                    {renderInputField("mail-outline", "Email", userData.email, (text) => setUserData({ ...userData, email: text }))}
                    {renderInputField("call-outline", "Phone", userData.phone, (text) => setUserData({ ...userData, phone: text }))}
                    {renderInputField("location-outline", "Location", userData.location, (text) => setUserData({ ...userData, location: text }))}
                    {renderInputField("briefcase-outline", "Professional Title", userData.professionalTitle, (text) => setUserData({ ...userData, professionalTitle: text }))}

                    <View style={styles.fieldContainer}>
                        <Ionicons name="document-text-outline" size={24} color="#4c669f" style={styles.icon} />
                        <TextInput
                            style={[styles.fieldInput, styles.multilineInput]}
                            value={userData.summary}
                            onChangeText={(text) => setUserData({ ...userData, summary: text })}
                            placeholder="Professional Summary"
                            multiline
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    {renderMultiField("Work Experience", "workExperience")}
                </View>

                <View style={styles.card}>
                    {renderMultiField("Education", "education")}
                </View>

                <View style={styles.card}>
                    <Text style={styles.multiFieldTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {userData.skills.map((skill, index) => (
                            <View key={index} style={styles.skillBadge}>
                                <Text style={styles.skillText}>{skill}</Text>
                                <TouchableOpacity onPress={() => removeField("skills", index)}>
                                    <Ionicons name="close-circle" size={20} color="#ff6b6b" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    <View style={styles.addSkillContainer}>
                        <TextInput
                            style={styles.addSkillInput}
                            placeholder="Add a skill"
                            onSubmitEditing={(event) => {
                                if (event.nativeEvent.text.trim() !== '') {
                                    setUserData(prevState => ({
                                        ...prevState,
                                        skills: [...prevState.skills, event.nativeEvent.text.trim()]
                                    }));
                                    event.target.clear();
                                }
                            }}
                        />
                    </View>
                </View>

                <View style={styles.card}>
                    {renderMultiField("Certifications", "certifications")}
                </View>

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Profile</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    headerGradient: {
        height: 200,
    },
    headerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: -40,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
    },
    changePhotoButton: {
        position: 'absolute',
        bottom: 0,
        right: '35%',
        backgroundColor: '#4c669f',
        borderRadius: 20,
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        marginBottom: 20,
        elevation: 3,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    icon: {
        marginRight: 10,
    },
    fieldInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
    },
    multiFieldContainer: {
        marginBottom: 20,
    },
    multiFieldTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4c669f',
        marginBottom: 10,
    },
    multiFieldItem: {
        backgroundColor: '#f0f2f5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    multiFieldInput: {
        fontSize: 16,
        color: '#333',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 10,
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    removeButton: {
        alignSelf: 'flex-end',
    },
    addButton: {
        backgroundColor: '#4c669f',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
    },
    skillText: {
        color: '#333',
        fontSize: 14,
        marginRight: 5,
    },
    addSkillContainer: {
        marginTop: 10,
    },
    addSkillInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#1D4ED8',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 25,
        elevation: 2,
        marginVertical: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default EditProfile;