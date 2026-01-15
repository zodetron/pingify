import React from 'react'
import { Navigate, Route, Routes } from 'react-router';
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import FriendsPage from "./pages/FriendsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import Layout from './components/Layout.jsx';

import {Toaster} from "react-hot-toast";
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import { useThemeStore } from './store/useThemeStore.js';



const App = () => {

  const {isLoading,authUser}= useAuthUser();
  const {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded
  
  if(isLoading) return <PageLoader/>


  return (
    <div className='min-h-screen w-full overflow-x-hidden transition-colors duration-300' data-theme={theme}>

    <Routes>

      <Route
        path="/"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" />
          ) : !isOnboarded ? (
            <Navigate to="/onboarding" />
          ) : (
            <Layout showSidebar={true}>
              <HomePage/>
            </Layout>
          )
        }/>
      <Route 
        path="/signup" 
        element ={
          !isAuthenticated ?<SignupPage/>:<Navigate to={isOnboarded? "/" : "/onboarding"}/>
        }/>
      <Route 
        path="/login" 
        element ={
      !isAuthenticated ?<LoginPage/>:<Navigate to={isOnboarded? "/" : "/onboarding"} />
        }/>

      <Route 
        path="/notifications" 
        element ={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <NotificationsPage/>
          </Layout>
        ) : (
          <Navigate to={isAuthenticated ? "/login" : "/onboarding"}/>)
        }/>

      <Route 
        path="/friends" 
        element ={isAuthenticated && isOnboarded ? (
        <Layout showSidebar={true}>
          <FriendsPage/>
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>)
        }/>

      <Route path="/call/:id" element ={
        isAuthenticated && isOnboarded ? (
              <CallPage/>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )
        }/>

      <Route 
        path="/chat/:id" element ={
          isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"}/>
          )
        }/>
6
      <Route 
        path="/onboarding" element ={
          isAuthenticated ?(
          !isOnboarded ? (
            <OnboardingPage/>
          ) : (
            <Navigate to="/"/>
          )
        ):(
          <Navigate to="/login"/>)
        }/>

    </Routes>

    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'hsl(var(--b2))',
          color: 'hsl(var(--bc))',
          border: '1px solid hsl(var(--bc) / 0.1)',
        },
        success: {
          iconTheme: {
            primary: 'hsl(var(--su))',
            secondary: 'white',
          },
        },
        error: {
          iconTheme: {
            primary: 'hsl(var(--er))',
            secondary: 'white',
          },
        },
      }}
    />

    </div>
  )
}

export default App
