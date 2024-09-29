import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [aboutUserInfo, setAboutUserInfo] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load aboutUserInfo from AsyncStorage when the app starts
    useEffect(() => {
        const loadUserInfoFromStorage = async () => {
            try {
                const storedUserInfo = await AsyncStorage.getItem('aboutUserInfo');
                if (storedUserInfo !== null) {
                    setAboutUserInfo(JSON.parse(storedUserInfo));
                }
            } catch (e) {
                console.error('Failed to load aboutUserInfo from AsyncStorage', e);
            }
        };

        loadUserInfoFromStorage();
    }, []);

    // Store aboutUserInfo in AsyncStorage whenever it changes
    useEffect(() => {
        const saveUserInfoToStorage = async () => {
            try {
                if (aboutUserInfo !== null) {
                    await AsyncStorage.setItem('aboutUserInfo', JSON.stringify(aboutUserInfo));
                    console.log('aboutUserInfo saved to AsyncStorage');
                }
            } catch (e) {
                console.error('Failed to save aboutUserInfo to AsyncStorage', e);
            }
        };

        saveUserInfoToStorage();
    }, [aboutUserInfo]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                setAboutUserInfo(prevInfo => ({
                    ...prevInfo,
                    email: currentUser.email || prevInfo?.email || '',
                    uid: currentUser.uid
                }));
            } else {
                // If user is logged out, remove sensitive data from aboutUserInfo
                setAboutUserInfo(prevInfo => {
                    if (prevInfo) {
                        const { email, uid, ...rest } = prevInfo;
                        return rest;
                    }
                    return null;
                });
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log('Data saved into context => ', user);
        console.log('About User Info Context => ', aboutUserInfo);
    }, [user, aboutUserInfo]);

    return (
        <UserContext.Provider value={{ aboutUserInfo, setAboutUserInfo, user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;