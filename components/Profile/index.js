import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-virtualized-view';
import { UserContext } from '../../context/userContextProvider';

const ProfilePage = ({ navigation }) => {
    const { aboutUserInfo } = useContext(UserContext);

    const renderListItem = ({ item, type }) => (
        <View style={styles.listItem}>
            <Text style={styles.listItemTitle}>{item.position || item.course || item.name}</Text>
            {type === 'work' && (
                <>
                    <Text style={styles.listItemSubtitle}>{item.company} | {item.startDate} - {item.endDate || 'Present'}</Text>
                    <Text style={styles.listItemDescription}>{item.description}</Text>
                </>
            )}
            {type === 'education' && (
                <Text style={styles.listItemSubtitle}>{item.college} | {item.startYear} - {item.graduationYear}</Text>
            )}
            {type === 'certification' && (
                <Text style={styles.listItemSubtitle}>{item.issuer} | {item.date}</Text>
            )}
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
                    <Text style={styles.name}>{aboutUserInfo?.name}</Text>
                    <Text style={styles.tagline}>{aboutUserInfo?.professionalTitle}</Text>
                </View>
            </LinearGradient>

            <View style={styles.container}>
                <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('ProfileEditScreen')}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>

                <View style={styles.infoCard}>
                    <View style={styles.fieldContainer}>
                        <Ionicons name="person-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>Username</Text>
                            <Text style={styles.fieldValue}>{aboutUserInfo?.username}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="mail-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>Email</Text>
                            <Text style={styles.fieldValue}>{aboutUserInfo?.email}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="call-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>Phone</Text>
                            <Text style={styles.fieldValue}>{aboutUserInfo?.phone}</Text>
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <Ionicons name="location-outline" size={24} color="#4c669f" />
                        <View style={styles.fieldTextContainer}>
                            <Text style={styles.fieldLabel}>Location</Text>
                            <Text style={styles.fieldValue}>{aboutUserInfo?.location}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Professional Summary</Text>
                    <Text style={styles.sectionContent}>{aboutUserInfo?.summary}</Text>
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Work Experience</Text>
                    <FlatList
                        data={aboutUserInfo?.workExperience}
                        renderItem={({ item }) => renderListItem({ item, type: 'work' })}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <FlatList
                        data={aboutUserInfo?.education}
                        renderItem={({ item }) => renderListItem({ item, type: 'education' })}
                        keyExtractor={item => item.id}
                    />
                </View>

                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Skills</Text>
                    <View style={styles.skillsContainer}>
                        {aboutUserInfo?.skills.map((skill, index) => (
                            <View key={index} style={styles.skillBadge}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {aboutUserInfo?.certifications && aboutUserInfo?.certifications.length > 0 && (
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionTitle}>Certifications</Text>
                        <FlatList
                            data={aboutUserInfo?.certifications}
                            renderItem={({ item }) => renderListItem({ item, type: 'certification' })}
                            keyExtractor={item => item.id}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        marginBottom: 60
    },
    headerGradient: {
        height: 250,
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
        marginTop: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    tagline: {
        fontSize: 16,
        color: '#e0e0e0',
        marginTop: 5,
    },
    editProfileButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 2,
    },
    editProfileText: {
        color: '#4c669f',
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        elevation: 3,
        marginBottom: 20,
    },
    fieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    fieldTextContainer: {
        marginLeft: 15,
        flex: 1,
    },
    fieldLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    fieldValue: {
        fontSize: 16,
        color: '#333',
    },
    sectionCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '100%',
        elevation: 3,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4c669f',
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
        color: '#333',
    },
    listItem: {
        marginBottom: 15,
    },
    listItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    listItemSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    listItemDescription: {
        fontSize: 14,
        color: '#333',
        marginTop: 5,
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    skillBadge: {
        backgroundColor: '#e0e0e0',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        margin: 5,
    },
    skillText: {
        color: '#333',
        fontSize: 14,
    },
});

export default ProfilePage;