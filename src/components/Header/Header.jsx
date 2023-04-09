import React, { useContext } from 'react'
import store from '../../data/store'
import { Link } from 'react-router-dom'
import './Header.css'

export const Header = ({setAuthActive}) => {

    const logOut = () => {
        // remove token from storage
        localStorage.clear()
    }

    const showAuthForm = () => {
        setAuthActive(true)
    }

    const login = false

    return(
        <div className="header">
            <ul className="headerMenu">
                <li>
                    <Link className='link' to='/'>Главная </Link>
                </li>
                <li>
                    <Link className='link' to ="report">  Сообщить о краже </Link>                   
                </li>
                {login ? 
                    <li><Link className="link" onClick={logOut} to="/">Выход</Link></li> : 
                    <li><Link className="link" onClick={showAuthForm} to="/">Вход</Link></li>}
            </ul>
        </div>
    )
}