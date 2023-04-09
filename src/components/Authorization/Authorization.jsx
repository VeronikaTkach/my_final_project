import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './Authorization.css'

export const Authorization = ({isAuthActive, setLoggedIn, setAuthActive}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [data, setData] = useState(null)

    const hideAuthorization = () => {
        setAuthActive(false)
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

    const authorizationUrl = 'https://sf-final-project-be.herokuapp.com/api/auth/sign_in'

    const authorizationRequest = (e) => {
        e.preventDefault()
        setError(false)
    
        const data = {
          email, password
        }
    
        const headers = {
          'Content-Type': 'application/json'
        }
    
        axios.post(authorizationUrl, data, headers)
          .then(res => {
            setData(res.data)
            setEmail('')
            setPassword('')
            setAuthActive(false)
            setLoggedIn(true)
            console.log(res)
            console.log(res.data)
            localStorage.setItem('token', res.data.data.token)
          })
          .catch(err => {
            setError(true)
            setEmail('')
            setPassword('')
          })
      }

    return(
        <div className={ isAuthActive ? 'authorization_window activate' : 'authorization_window' } onClick={hideAuthorization} >
            <form onSubmit={authorizationRequest} className='authorization' onClick={stop}>
                <Link to='/registration' onClick={hideAuthorization} className='auth'>Регистрация</Link>
                <input type="text" value={email} onChange={changeEmail} placeholder='Email' />
                <input type="password" value={password} onChange={changePass} placeholder='Пароль' />
                {error && <p className='alarm'>Ошибка</p>}
                <button type='submit' className='authorization_button'>Вход</button>
            </form>
        </div>
    )
}