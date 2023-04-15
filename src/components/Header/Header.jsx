import React, { useContext } from 'react'
import StoreContext from '../../data/store'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Header.css'
import { CaseForm } from '../CaseForm/CaseForm'

export const Header = ({setAuthActive}) => {

    const [isLoggedIn, setLoggedIn] = useContext(StoreContext)

    const logOut = () => {
        setLoggedIn (false)
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

                {isLoggedIn ? 
                    <li><Link className="link" onClick={logOut} to="/">Выход</Link></li> : 
                    <li><Link className="link" onClick={showAuthForm} to="/">Вход</Link></li>}
            </ul>
        </div>
    )
}