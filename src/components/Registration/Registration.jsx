import React, {useState} from "react"
import './Registration.css'
import axios from 'axios'

export const Registration = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmpassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [clientId, setClientId] = useState('')
    const [error, setError] = useState(false)

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

    const registrationRequest = (e) => {
        e.preventDefault()
        setError(false)

        const data = {
            firstName,
            lastName,
            email,
            password,
            confirmpassword,
            clientId
        }

        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post()
            .then(res => {
                setData(res.data)
                setEmail('')
                setFirstName('')
                setLastName('')
                setPassword('')
                setConfirmPassword('')
                setClientId('')
            })
            .catch(error => {
                console.log(error)
                setError(true)
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

                {error && <p className='alarm'>Ошибка</p>}
                <button className='signUp_button'>Зарегистрироваться</button>
            </form>
        </>
    )
}

