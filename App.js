import React, { useState } from 'react'
import QuestionList from './components/Questions'
import BottomNavBar from './components/BottomNav/BottomNavBar'
import ProfilePage from './components/Profile';
import EditProfile from './components/Profile/EditProfile';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tabName, screenName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      {/* <QuestionList /> */}
      {/* <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} /> */}
      {/* <ProfilePage /> */}
      <EditProfile />
    </>
  )
}

export default App