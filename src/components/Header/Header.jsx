import React, { useContext } from 'react'
import store from '../../data/store'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Header.css'
import { CaseForm } from '../CaseForm/CaseForm'

export const Header = ({isLoggedIn, setLoggedIn, setAuthActive}) => {

    const logOut = () => {
        setLoggedIn (false)
        // remove token from storage
        localStorage.clear()
    }

    const showAuthForm = () => {
        setAuthActive(true)
    }

    return(
        <div className="header">
            <ul className="headerMenu">
                <li>
                    <Link className='link' to='/'>Главная </Link>
                </li>

                <li>
                    <Link className='link' to ="caseform">Сообщить о краже </Link>                   
                </li>

                {/* <Routes>
                <Route path="/caseform" element={<CaseForm />}>Test</Route>
                </Routes> */}

                {isLoggedIn ? 
                    <li><Link className="link" onClick={logOut} to="/">Выход</Link></li> : 
                    <li><Link className="link" onClick={showAuthForm} to="/">Вход</Link></li>}
            </ul>
        </div>
    )
}