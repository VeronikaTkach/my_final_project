import React from 'react'
import {Link} from 'react-router-dom'
import './Authorization.css'

const Authorization = ({active, setActive}) => {

    const activateAuthorization = () => {
        setActive(false)
    }

    return(
        <div className={ active ? 'signIn_window activate' : 'signIn_window' } onClick={activateAuthorization} >
            <form className='signIn' onSubmit={onSubmit} onClick={stop}>
                <Link to='/signUp' onClick={activateAuthorization} className='auth'>Registration</Link>
                <input type="text" value={email} onChange={changeEmail} placeholder='Email' />
                <input type="password" value={password} onChange={changePass} placeholder='Password' />
                {error && <p className='alarm'>Error</p>}
                <button type='submit' className='signIn_button'>Sign In</button>
            </form>
        </div>
    )
}

export default Authorization;