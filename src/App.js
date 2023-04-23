import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import {Header} from './components/Header';
import {Main} from './components/Main';
import './index.css';
import {Authorization} from './components/Authorization';
import {Registration} from './components/Registration';
import {EmployeeList} from './components/EmployeeList';
import {EmployeeDetail} from './components/EmployeeDetail';
import {CaseList} from './components/CaseList';
import {CaseForm} from './components/CaseForm';
import {CaseDetail} from './components/CaseDetail';

const App = () => {
  
  const [authActive, setAuthActive] = useState(false)

  return (
    <div className='wrapper'>
        <Header setAuthActive={setAuthActive} />
        <Authorization isAuthActive={authActive} setAuthActive={setAuthActive} />
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/caseform" element={<CaseForm />} />
          <Route path="/cases" element={<CaseList />} />
          <Route path={"/cases/:itemId"} element={<CaseDetail />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path={"/employees/:itemId"} element={<EmployeeDetail />} />
        </Routes>
    </div>
  )
}

export default App;
