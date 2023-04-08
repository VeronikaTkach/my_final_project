import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import store from '../../data/store'
import './Authorization.css'

export const Authorization = ({active, setActive}) => {

    const {
        onSubmit, 
        email, setEmail,
        password, setPassword, 
        error
    } = useContext(store)

    const activateAuthorization = () => {
        setActive(false)
    }

    const stop = (e) => {
        e.stopPropagation()
    }
    
    const changeEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const changePass = (e) => {
        setPassword(e.target.value)
    }

    return(
        <div className={ active ? 'authorization_window activate' : 'authorization_window' } onClick={activateAuthorization} >
            <form className='authorization' onSubmit={onSubmit} onClick={stop}>
                <Link to='/registration' onClick={activateAuthorization} className='auth'>Регистрация</Link>
                <input type="text" value={email} onChange={changeEmail} placeholder='Email' />
                <input type="password" value={password} onChange={changePass} placeholder='Пароль' />
                {error && <p className='alarm'>Ошибка</p>}
                <button type='submit' className='authorization_button'>Вход</button>
            </form>
        </div>
    )
}