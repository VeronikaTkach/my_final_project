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

  const [login, setLogin] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [active, setActive] = useState(false)
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)

  const signIn = (e) => {
    e.preventDefault()
    setError(false)

    const data = {
      email, password
    }

    const headers = {
      'Content-Type': 'application/json'
    }

    axios.post('', data, { headers })
      .then(res => {
        setData(res.data)
        setEmail('')
        setPassword('')
        setActive(false)
        setLogin(true)
        localStorage.setItem('token', res.data.data.token)
      })
      .catch(err => {
        setError(true)
        setEmail('')
        setPassword('')
      })
  }

  return (
    <div className='wrapper'>
       <StoreApi.Provider value={{ login, setLogin, signIn, email, setEmail, login, setLogin, password, setPassword
        // error, setError, data, setData, personsInfo, setPersonsInfo, cases, setCases
          }}>
        <Header active={active} setActive={setActive}  />
        <Authorization active={active} setActive={setActive} />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </StoreApi.Provider>
    </div>
  )
}

export default App;
