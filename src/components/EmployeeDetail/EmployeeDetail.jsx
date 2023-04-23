import React, {Fragment, useState, useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from "../../data/store" 
import './EmployeeDetail.css'
import axios from 'axios'

export const EmployeeDetail = () => {
   
    const employeesUrl = "/api/officers"
    const {apiDomain} = useContext(StoreContext)
    const userToken = localStorage.getItem('token')

    const navigate = useNavigate()
    const {state} = useLocation()
    const employee = state

    const [approved, setApproved] = useState(employee.approved)

    const changeLastName = (e) => {
        setLastName(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const checkHandler = () => {
        setApproved(!approved)
    }

    const updateEmployeeData = async (e) => {
        e.preventDefault()
        
        const data = {
            firstName, lastName, approved
        }

        if(password != ''){
            data.password = password
        }

        const headers = {
            'Authorization': 'Bearer ' + userToken
        }

        axios.put( apiDomain + employeesUrl + '/' + employee._id, data, {
            headers: {
                'Authorization': 'Bearer ' + userToken
            }
        })
        .then(res => {
            navigate("/employees");
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <Fragment>
            <h1 className='detail_title'>Детальная страница сотрудника</h1>
            <form className='detail_form' onSubmit={updateEmployeeData}>
            <input type="text" onChange={changeFirstName} value={firstName} placeholder='Введите имя' />
            <input type="text" onChange={changeLastName} value={lastName} placeholder='Введите фамилию'/>
            <input type="text" value={employee.email} readOnly />
            <input type="text" value={employee.clientId} readOnly />
            <input type="password" onChange={changePassword} placeholder='Задайте пароль'/>
            <input type="checkbox" id="checkbox" checked={approved} onChange={checkHandler} />
            <label htmlFor="checkbox">одобрен</label> 
            <button type='Submit' className='button save_changes'>Сохранить изменения</button>
            </form>
            
        </Fragment>
    )
}