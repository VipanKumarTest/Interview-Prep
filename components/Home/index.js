import React from 'react'
import Header from './Header'
import QuestionList from '../Questions'
import BottomNavBar from '../BottomNav/BottomNavBar'

const HomeComponent = () => {
    return (
        <>
            <Header />
            <QuestionList radius={20} />
            {/* <BottomNavBar /> */}
        </>

    )
}

export default HomeComponent