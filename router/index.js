import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import your screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AIChat from '../screens/AIChat';
import Bookmark from '../screens/Bookmark';
import ProfileEdit from '../screens/ProfileEdit';
import AnswerScreen from '../screens/AnswerScreen';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';

// Import your BottomNavBar component
import BottomNavBar from '../components/BottomNav/BottomNavBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ProfileEditScreen" component={ProfileEdit} />
        <Stack.Screen name="AnswerScreenScreen" component={AnswerScreen} />
        <Stack.Screen name="RegisterScreen" component={Register} />
        <Stack.Screen name="LoginScreen" component={Login} />
    </Stack.Navigator>
);

const MainTabs = () => (
    <Tab.Navigator
        tabBar={(props) => <BottomNavBar {...props} />}
        screenOptions={{ headerShown: false }}
    >
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="BookmarkScreen" component={Bookmark} />
        <Tab.Screen name="AIChatScreen" component={AIChat} />
        <Tab.Screen name="ProfileScreen" component={Profile} />
    </Tab.Navigator>
);



export default Router;