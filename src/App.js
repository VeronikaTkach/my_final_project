import React, { useState } from 'react';
import StoreApi from './data/store'
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import './index.css';
import Authorization from './components/Authorization/Authorization';
import axios from 'axios'

const App = () => {

  const [login, setLogin] = useState();
  const [active, setActive] = useState(false);

  return (
    <div className='wrapper'>
       <StoreApi.Provider value={{  login, setLogin
        // onSubmit, login, setLogin, email, setEmail, password, setPassword,
        // error, setError, data, setData, personsInfo, setPersonsInfo, cases, setCases
      }}>
      <Header active={active} setActive={setActive}  />
      <Authorization active={active} setActive={setActive} />
      <Main />

      </StoreApi.Provider>
    </div>
  )
}

export default App;
