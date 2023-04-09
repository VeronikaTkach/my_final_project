import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios'
import StoreApi from './data/store';
import {Header} from './components/Header';
import {Main} from './components/Main';
import './index.css';
import {Authorization} from './components/Authorization';
import {Registration} from './components/Registration';

const App = () => {
  
  const [authActive, setAuthActive] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  return (
    <div className='wrapper'>
       <StoreApi.Provider value={{ data, setData
        // error, setError, personsInfo, setPersonsInfo, cases, setCases
          }}>
        <Header setAuthActive={setAuthActive}  />
        <Authorization isAuthActive={authActive} setAuthActive={setAuthActive} />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </StoreApi.Provider>
    </div>
  )
}

export default App;
