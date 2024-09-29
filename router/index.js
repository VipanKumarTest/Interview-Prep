import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import your screens
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import AIChat from '../screens/AIChat';
import Bookmark from '../screens/Bookmark';
import ProfileEdit from '../screens/ProfileEdit';
import AnswerScreen from '../screens/AnswerScreen';

// Import your BottomNavBar component
import BottomNavBar from '../components/BottomNav/BottomNavBar';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import VerifyOTPScreen from '../screens/auth/VerifyOtp';
import ForgotPasswordScreen from '../screens/auth/ForgetPassword';
import { UserContext } from '../context/userContextProvider';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
    </Stack.Navigator>
);

const MainRouter = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="ProfileEditScreen" component={ProfileEdit} />
        <Stack.Screen name="AnswerScreenScreen" component={AnswerScreen} />
    </Stack.Navigator>
);

// const MainTabs = () => (
//     <Tab.Navigator
//         tabBar={(props) => <BottomNavBar {...props} />}
//         screenOptions={{ headerShown: false }}
//     >
//         <Tab.Screen name="HomeScreen" component={Home} />
//         <Tab.Screen name="BookmarkScreen" component={Bookmark} />
//         <Tab.Screen name="AIChatScreen" component={AIChat} />
//         <Tab.Screen name="ProfileScreen" component={Profile} />
//     </Tab.Navigator>
// );

const MainTabs = () => (
    <Tab.Navigator
        tabBar={(props) => {
            if (props.state.index === 2) {
                return null;
            }
            return <BottomNavBar {...props} />;
        }}
        screenOptions={{
            headerShown: false,
        }}
    >
        <Tab.Screen name="HomeScreen" component={Home} />
        <Tab.Screen name="BookmarkScreen" component={Bookmark} />
        <Tab.Screen
            name="AIChatScreen"
            component={AIChat}
            options={{
                tabBarStyle: { display: 'none' },
                tabBarButton: () => null,
            }}
        />
        <Tab.Screen name="ProfileScreen" component={Profile} />
    </Tab.Navigator>
);


const Router = () => {
    const { user, loading } = useContext(UserContext);

    if (!loading) {

    }
    return ((user) ? <MainRouter /> : <AuthStack />)
}

export default Router;