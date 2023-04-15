import React, {useState, useContext} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './EmployeeCreate.css'
import store from '../../data/store'

export const EmployeeCreate= () => {
    const {personsInfo, setPersonsInfo} = useContext(store)
    const [submit, setSubmit] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    

    const changeName = (e) => {
        setFirstName(e.target.value)
    }

    const changeSurname = (e) => {
        setLastName(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePass = (e) => {
        setPassword(e.target.value)
    }

    const employeeCreate = (e) => {
        e.preventDefault()

        if(!firstName){
            alert('Введите имя сотрудника')
        }

        if(!lastName){
            alert('Введите фамилию сотрудника!')
        }

        if(!password){
            alert('Введите пароль!')
        }

        if(!email){
            alert('Введите email!')
        }

        const data = {
            firstName, lastName, email, password, approved: false
        }
        axios.post('https://sf-final-project-be.herokuapp.com/api/officers',data,{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>{
            setPersonsInfo(res.data)
            setFirstName('')
            setPassword('')
            setEmail('')
            setLastName('')
            setSubmit(true)
        })
    }

    return(
        <div>
            <h1 className='report_title'>Ответственные сотрудники</h1>
            <form className='employees_form' onSubmit={employeeCreate}>
            <label>Имя</label>
            <input type="text" className='input_for_report' onChange={changeName} value={firstName}/>
            <label>Фамилия</label>
            <input type="text" className='input_for_report' onChange={changeSurname} value={lastName}/>
            <label>Email</label>
            <input type="text" className='input_for_report' onChange={changeEmail} value={email}/>
            <label>Пароль</label>
            <input type="text" className='input_for_report' onChange={changePass} value={password}/>

            <button type='submit' className='employee_button'>Добавить сотрудника</button>
            {submit && alert('Сотрудник добавлен')}
            <Link to='/list'>Список сотрудников</Link>
            </form>
        </div>
    )
}