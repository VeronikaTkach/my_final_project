import React, {Fragment, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { StoreContext } from "../../data/store" 
import './EmployeeDetail.css'
import axios from 'axios'

export const EmployeeDetail = () => {
   
    const employeesUrl = "/api/officers"
    const {apiDomain} = useContext(StoreContext)

    const location = useLocation()

    const [submit, setSubmit] = useState(false)
    const [employee, setEmployee] = useState(location.state)
    const [approved, setApproved] = useState(employee.approved)
    // const email = employee.email
    const [password, setPassword] = useState(employee.password)
    const [firstName, setFirstName] = useState(employee.firstName)
    const [lastName, setLastName] = useState(employee.lastName)

    const changeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const changeLastName = (e) => {
        setLastName(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

   const onApproved = () => {
    if (approved === false){
        setApproved(true)
        alert('Сотрудник одобрен')
    } 
   }

   const disApproved = () => {
    if (approved === true){
        setApproved(false)
        alert('Сотрудник не одобрен')
    }
   }

    const employeeDetailForm= async (e) => {
        e.preventDefault()
        setSubmit(true)

        const data = {
            firstName, lastName, approved
        }

        axios.put({apiDomain} + {employeesUrl} + '/' + {employee._id},data,{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
            
        }).then(res => {
            setEmployee(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <Fragment>
            <h1 className='detail_title'>Детальная страница сотрудника</h1>
            <form className='detail_form' onSubmit={employeeDetailForm}>
            <input type="text" onChange={changeFirstName} value={firstName} placeholder='Введите имя' />
            <input type="text" onChange={changeLastName} value={lastName} placeholder='Введите фамилию'/>
            <input type="password" onChange={changePassword} placeholder='Задайте пароль'/> 
            {submit && <p className='report_sent'>Сохранить изменения</p>}
            <button type='Submit' className='button save_changes'>Сохранить изменения</button>
            </form>
            <div className="approve_block">
                <button className='approve' onClick={onApproved}>Одобрен</button>
                <button className='unapprove' onClick={disApproved}>Не одобрен</button>
            </div>
            
        </Fragment>
    )
}