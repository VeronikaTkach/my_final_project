import React, {useContext, useState} from "react"
import { StoreContext } from "../../data/store" 
import './Registration.css'
import axios from 'axios'

export const Registration = () => {

    const registrationUrl = '/api/auth/sign_up'
    
    const {apiDomain} = useContext(StoreContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [clientId, setClientId] = useState('')
    const [error, setError] = useState('')
    const [data, setData] = useState(null)

    const enterName = (e) => {
        setFirstName(e.target.value)
    }

    const enterLastName = (e) => {
        setLastName(e.target.value)
    }

    const enterEmail = (e) => {
        setEmail(e.target.value)
    }

    const enterId = (e) => {
        setClientId(e.target.value)
    }

    const enterPassword = (e) => {
        setPassword(e.target.value)
    }

    const confirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const checkPasswords = (pass, confirmpass) => {
        if (pass === confirmpass){
            return true
        }
        else {
            return false
        }
    }

    const registrationRequest = (e) => {
        e.preventDefault()
        setError('')

        const data = {
            firstName,
            lastName,
            email,
            password,
            clientId
        }

        const passwordCheckResult = checkPasswords(password, confirmpassword)
        if (passwordCheckResult === false){
            setError('Пароли не совпадают')
            return
        }

        if (email == ""){
            setError('Введите email')
            return
        }

        if (password == ""){
            setError('Введите пароль')
            return
        }

        if (clientId == ""){
            setError('Введите clientId')
            return
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post(apiDomain + registrationUrl, data, headers)
            .then(res => {
                setData(res.data)
                setEmail('')
                setFirstName('')
                setLastName('')
                setPassword('')
                setConfirmPassword('')
                setClientId('')
                console.log(res)
                console.log(res.data)
            })
            .catch(error => {
                console.log(error)
                setError(error.response.data.message)
            })
    }

    return(
        <>
            <h1 className='registration_title'>Регистрация</h1>
            <form onSubmit={registrationRequest} className='registration'>
                <input onChange={enterName} value={firstName} type='text' placeholder='Имя'/>
                <input onChange={enterLastName} value={lastName} type="text" placeholder='Фамилия' />
                <input onChange={enterEmail} value={email} type="text" placeholder='Email' />
                <input onChange={enterId} value={clientId} type="text" placeholder='clientId'/>
                <input onChange={enterPassword} value={password} type="password" placeholder='Пароль'/>
                <input onChange={confirmPassword} value={confirmpassword} type="password" placeholder='Подтвердите пароль' />

                <label className='alarm'>{error}</label>
                <button className='registration_button'>Зарегистрироваться</button>
            </form>
        </>
    )
}

