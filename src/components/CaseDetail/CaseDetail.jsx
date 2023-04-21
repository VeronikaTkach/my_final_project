import React, { Fragment, useContext } from 'react'

import './CaseDetail.css'
import { StoreContext } from '../../data/store'
import { useLocation, useNavigate } from 'react-router-dom'

export const CaseDetail = () => {

    const caseUrl = "/api/cases"
    const {apiDomain} = useContext(StoreContext)
    const userToken = localStorage.getItem('token')

    const navigate = useNavigate()
    const {state} = useLocation()
    const currentCase = state

    const [status, setStatus] = useState(currentCase.status)
    const [licenseNumber, setlicenseNumber] = useState(currentCase.licenseNumber)
    const [type, setType] = useState(currentCase.type)
    const [ownerFullNAme, setOwnerFullName] = useState(currentCase.ownerFullName)
    const [color, setColor] = useState(currentCase.color)
    const [date, setDate] = useState(currentCase.ldate)
    const [employee, setEmployee] = useState(currentCase.licenseNumber)
    const [description, setDescription] = useState(currentCase.licenseNumber)
    const [resolution, setResolutionn] = useState(currentCase.resolution)

    const changeStatus = (e) => {
        setStatus(e.target.value)
    }

    const changeLicensNumber = (e) => {
        setLicensNumber(e.target.value)
    }

    const changeType = (e) => {
        setType(e.target.value) 
    }

    const changeOwnerFullNAme = (e) => {
        setOwnerFullNAme(e.target.value)
    }

    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    const changeEmployee = (e) => {
        setEmployee(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeResolution = (e) => {
        setResolution(e.target.value)
    }


    return(
        <Fragment>
        <h1 className='caseDetail_title'>Детальная страница сообщения о краже</h1>
        <form className="caseDetail_form" onSubmit={caseDetailForm}>
            <input type="text" onChange={changeFullName} value={ownerFullName} placeholder='ФИО владельца'/>
            {/* <input type="text" value={employee.clientId} readOnly /> */}
            <input type="text" onChange={changeColor} value={color} placeholder='Цвет велосипеда'/>
            <label>Дата кражи: {moment(date).format("MMMM Do YYYY, h:mm:ss a")}</label>
            <input type ="date"></input>
            <input type="text" onChange={changeLicenseNumber} value={licenseNumber} placeholder='Номер лицензии'/>
            <input type="text" onChange={changeType} value={type} placeholder='Тип велосипеда'/>
            <p className = "immute">Создано:{moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
            <p className = "immute">Обновлено:{moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
            <p>Статус заявки:<b>{status}</b></p>
            <select onChange={changeEmployee} defaultValue={'default'}>
                <option value="default">Выберите сотрудника по заявке:</option>
                {approvedPersons.map((person, index) => (
                    <option value={person._id} key={index}>{person.firstName} {person.lastName}</option>
                ))}
            </select>
            { updatedPerson ? <p>Ответственный сотрудник по заявке {updatedPerson.firstName} {updatedPerson.lastName}</p> : <p> Не назначен</p>}
            {description ? <p>{description}</p> : <p>There is now description now</p>}
            {!resolution || status !== 'done' ? <p className='immute'>Нет решения до сих пор</p> : <p className='immute'>{resolution}</p>}
            {submit && <p className='report_sent'>Изменения сохранены</p>}
            <button type='Submit' className='button save'>Сохранить</button>
        </form>
        </Fragment>
    )
}