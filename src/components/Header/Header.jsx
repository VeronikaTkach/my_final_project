import React, { useContext } from 'react'
import store from '../../data/store'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({active, setActive}) => {

    const {login, setLogin} = useContext(store)

    const logOut = () => {
        setLogin(false)
        localStorage.clear()
    }

    const onActive = () => {
        setActive(true)
    }

    return(
        <div className="header">
            <ul className="headerMenu">
                <li>
                    <Link className='link' to='/'>Главная </Link>
                </li>
                <li>
                    <Link className='link' to ="report">  Сообщить о краже </Link>                   
                </li>
                {login ? <li> <Link className="link" onClick={logOut} to="/">Выход</Link></li> : 
                    <li><Link className="link" onClick={onActive} to="/">Вход</Link></li>}
            </ul>
        </div>
    )
}

export default Header;