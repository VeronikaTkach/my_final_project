import React, { Fragment } from 'react'
import { StoreContext } from '../../data/store'
import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Header.css'
import { CaseForm } from '../CaseForm/CaseForm'

export const Header = ({setAuthActive}) => {

    const {isLoggedIn} = React.useContext(StoreContext)
    const {setIsLoggedIn} = React.useContext(StoreContext)

    const logOut = () => {
        setIsLoggedIn(false)
        localStorage.clear()
    }

    const showAuthForm = () => {
        setAuthActive(true)
    }

    return(
        <Fragment>
            <div className="header">
            <ul className="headerMenu">
                <li>
                    <Link className='link' to='/'>Главная </Link>
                </li>

                <li>
                    <Link className='link' to="caseform">Сообщить о краже </Link>
                </li>

                {isLoggedIn ?
                    <li><Link className="link" onClick={logOut} to="/">Выход</Link></li> :
                    <li><Link className="link" onClick={showAuthForm} to="/">Вход</Link></li>}
            </ul>
        </div>
        <div className='line'></div>
        </Fragment>
    )
}