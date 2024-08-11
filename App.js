import React, { useState } from 'react'
import QuestionList from './components/Questions'
import BottomNavBar from './components/BottomNav/BottomNavBar'
import ProfilePage from './components/Profile';
import EditProfile from './components/Profile/EditProfile';
import ChatAIComponent from './components/ChatAI';
import HomeComponent from './components/Home';
import Bookmarks from './components/Bookmarks';
import AnswerComponent from './components/Questions/AnswerComponent';

const App = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tabName, screenName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      {/* <QuestionList /> */}
      <BottomNavBar activeTab={activeTab} onTabPress={handleTabPress} />
      {/* <ProfilePage /> */}
      {/* <EditProfile /> */}
      {/* <ChatAIComponent /> */}
      <HomeComponent />
      {/* <Bookmarks /> */}
      {/* <AnswerComponent /> */}
    </>
  )
}

export default App;