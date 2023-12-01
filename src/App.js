import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
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


function App() {

  let token = true
   
  
  return (
   <MantineProvider>
    <RecoilRoot>
    <Router>
            <Routes>
              <Route exact path='/' element={<LoginForm/>}>
              <Route exact path='/login' />
              </Route>
                
             
                <Route element={<PrivateRoutes/>}>
                    <Route exact path='/dashboard' element={token ? <DashBoardPage /> : <LoginForm/>} />
                    <Route exact path='/machinelist' element={token ? <MachinePage /> : <LoginForm/>}/>
                    <Route exact path='/trails' element={token ?  <TrailPage /> : <LoginForm/>} />
                    <Route exact path='/reports' element={token ? <ReportPage />: <LoginForm/>} />
                    <Route exact path='/settings' element={token ? <SettingsPage />: <LoginForm/>} />
                 </Route>
                   
                
               
            </Routes>
        </Router>
     </RecoilRoot>
        </MantineProvider>
   
      
  );
}

export default App;

