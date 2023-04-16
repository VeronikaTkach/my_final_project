import React, {useState} from "react"
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
    const [error, setError] = useState(false)
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

    const checkPasswords = () =>
    {

    }

    const registrationRequest = (e) => {
        e.preventDefault()
        setError(false)

        const data = {
            firstName,
            lastName,
            email,
            password,
            clientId
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
                <button className='registration_button'>Зарегистрироваться</button>
            </form>
        </>
    )
}

