import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import store from '../../data/store'
import './Authorization.css'

const Authorization = ({active, setActive}) => {

    const {
        onSubmit, email,
        changeEmail, password, 
        changePass, error, 
        // data, setData,
        // email, setEmail,
        // error, setError, 
        // password, setPassword
    } = useContext(store)

    const activateAuthorization = () => {
        setActive(false)
    }

    return(
        <div className={ active ? 'authorization_window activate' : 'authorization_window' } onClick={activateAuthorization} >
            <form className='authorization' onSubmit={onSubmit} onClick={stop}>
                <Link to='/authorization' onClick={activateAuthorization} className='auth'>Registration</Link>
                <input type="text" value={email} onChange={changeEmail} placeholder='Email' />
                <input type="password" value={password} onChange={changePass} placeholder='Password' />
                {error && <p className='alarm'>Error</p>}
                <button type='submit' className='authorization_button'>Sign In</button>
            </form>
        </div>
    )
}

export default Authorization;