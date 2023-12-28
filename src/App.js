import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import {
    RecoilRoot,
  } from 'recoil';
import LoginForm from './components/LoginForm/LoginForm';
import PrivateRoutes from './utils/PrivateRoutes';
import ReportPage from './pages/ReportPage';
import MachinePage from './pages/MachinePage';
import TrailPage from './pages/TrailPage';
import DashBoardPage from './pages/DashBoardPage';
import SettingsPage from './pages/SettingsPage';
import Home from './components/home/Home';
import NoDataAvailable from './components/noDataAvailable/NoDataAvailable';
import PageNotFound404 from './pages/PageNotFound404';


function App() {

 
   
  const [colorScheme, setColorScheme] = useState('light')
  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
   <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
    <RecoilRoot>
    <Router>
            <Routes>
              <Route exact path='/about' element={<Home/>} />

              <Route exact path='/' element={ window.localStorage.getItem('username') !== null ? <Navigate to={'/home/dashboard'}/> : <LoginForm/>} >
                  <Route exact path='/login'/>
                <Route />
              </Route>
              {/* <Route exact path='/login' element={ window.localStorage.getItem('username') !== null ? <Navigate to={'/dashboard'}/> : <LoginForm/>}/> */}
              <Route exact path='/home' element={<PrivateRoutes/>}>
                  <Route exact path='dashboard'  element={ <DashBoardPage /> } />
                  <Route exact path='machinelist' element={ <MachinePage /> }/> 
                  <Route exact path='trails' element={  <TrailPage /> } />
                  <Route exact path='reports' element={ <ReportPage />} />
                  <Route exact path='settings' element={ <SettingsPage />} />
                </Route> 
                <Route path='*' element={<PageNotFound404/>}/>    
            </Routes>
        </Router>
     </RecoilRoot>
        </MantineProvider>
        </ColorSchemeProvider>
      
  );
}

export default App;

