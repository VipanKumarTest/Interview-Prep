import React, { useState } from 'react'
import Header from './Header'
import QuestionList from '../Questions'
import BottomNavBar from '../BottomNav/BottomNavBar'

const HomeComponent = ({ navigation }) => {

    return (
        <>
            <Header />
            <QuestionList navigation={navigation} radius={20} />
        </>

    )
}

export default HomeComponent