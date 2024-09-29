import React, { useState } from 'react'
import Header from './Header'
import QuestionList from '../Questions'
import BottomNavBar from '../BottomNav/BottomNavBar'
import AIChatButton from '../ChatAI/AiChatButton'
import { TouchableOpacity } from 'react-native-gesture-handler'

const HomeComponent = ({ navigation }) => {

    return (
        <>
            <Header navigation={navigation} />
            <TouchableOpacity onPress={() => navigation.navigate('AIChatScreen')}>
                <AIChatButton />
            </TouchableOpacity>
            <QuestionList navigation={navigation} radius={20} />
        </>

    )
}

export default HomeComponent