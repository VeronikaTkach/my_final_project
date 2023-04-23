import React, {useState, useContext, useEffect, Fragment} from 'react'
import { StoreContext } from "../../data/store" 
import axios from 'axios'
import './CaseForm.css'

export const CaseForm = () => {

    const getEmployeeListUrl = "/api/officers"
    const anonymousReportUrl = "/api/public/report"
    const authorizedReportUrl = "/api/cases"
    const {apiDomain} = useContext(StoreContext)

    const {isLoggedIn} = useContext(StoreContext)

    const [employeeList, setEmployeeList] = useState([])

    const [licenseNumber, setLicenseNumber] = useState('')
    const [type, setType] = useState('')
    const [ownerFullName, setOwnerFullName] = useState('')
    const [date, setDate] = useState()
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    
    const approvedEmployeesList = employeeList.filter((employee) => {
        return employee.approved === true
    })
    
    const loadEmployees = async () => {
        const userToken = localStorage.getItem('token')
        const res = await axios.get(apiDomain + getEmployeeListUrl, {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        setEmployeeList(res.data.officers)
    } 
    
    useEffect(() => { loadEmployees() }, [setEmployeeList])

    const changeName = (e) => {
        setOwnerFullName(e.target.value)
    }

    const changeLicense = (e) => {
        setLicenseNumber(e.target.value)
    }

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const changeType = (e) => {
        setType(e.target.value)
    }

    const changeEmployee = (e) => {
        const chosenId = e.target.value
        setEmployeeId(chosenId)
        console.log(chosenId)
    }

    const sendCaseForm = (e) => {
        e.preventDefault()

        if (!ownerFullName){
            alert('Введите Ваши данные ФИО!')
        }
        
        if (!type){
            alert('Выберите тип велосипеда!')
        }

        if (!licenseNumber){
            alert('Введите номер лицензии!')
        }

        const caseFormUrl = (isLoggedIn ? apiDomain + authorizedReportUrl : apiDomain + anonymousReportUrl)
            
        const getRequestData = () => {
            if (isLoggedIn == true) {
                return {licenseNumber, date, color, type, ownerFullName, officer: employeeId, description }
            }
            else {
                return {licenseNumber, date, color, type, ownerFullName, description, clientId: '002610f3-abca-4187-9f08-b825e6504605' }
            }
        }

        const requestHeaders = isLoggedIn ?
            { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }} :
            null

        axios.post(caseFormUrl, getRequestData(), requestHeaders)
            .then(res=>{
                setLicenseNumber('')
                setOwnerFullName('')
                setColor('')
                setType('')
                setDate('')
                setDescription('')
                alert('Report sent')
            })
            .catch(err => {
                console.log(err)
            });
    }

    return(
        <>
        <h1 className='caseform_title'>Сообщить о краже</h1>
        <form onSubmit={sendCaseForm} className="caseform">
        <input type="text" onChange={changeName} value={ownerFullName} placeholder='ФИО владельца'/>
        <input type="text" onChange={changeLicense} value={licenseNumber} placeholder='Номер лицензии'/>
        <input type="date" onChange={changeDate} value={date} placeholder='Дата кражи'/>
        <input type="text" onChange={changeDescription} value={description} placeholder='Описание'/>
        <input type="text" onChange={changeColor} value={color} placeholder='Цвет'/>
        <br/>

        {isLoggedIn &&  <Fragment>
                    <label className="type">ФИО сотрудника</label>
                    <br/>
                    <select onChange={changeEmployee} defaultValue={'default'}>
                    <option value="default">Ответственный сотрудник:</option>
                    {approvedEmployeesList.map((person, index) => (
                        <option value={person._id} key={index}>{person.firstName} {person.lastName}</option>
                    ))}
                </select>
                </Fragment>}
                    <br/>
                
        <label  className="type">Тип велосипеда</label>
                <br/>
                <select defaultValue={'default'}  onChange={changeType}>
                    <option value="default">Выберите тип велосипеда:</option>
                    <option value="general">Городской</option>
                    <option value="sport">Спортивный</option>
                </select>
                <br/>
                <button type='submit' className='authorization_button'>Сообщить о краже</button>
        </form>
        </>
    )
}