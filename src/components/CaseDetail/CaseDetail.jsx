import React, { Fragment, useState, useContext, useEffect } from 'react'
import './CaseDetail.css'
import { StoreContext } from '../../data/store'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

export const CaseDetail = () => {

    const availableStatuses = ['new', 'in_progress', 'done'
]
    const getEmployeeListUrl = "/api/officers"
    const casesUrl = "/api/cases"
    const {apiDomain} = useContext(StoreContext)
    const userToken = localStorage.getItem('token')

    const navigate = useNavigate()
    const {state} = useLocation()
    const currentCase = state

    const [employeeList, setEmployeeList] = useState([])

    const [caseStatus, setCaseStatus] = useState(currentCase.status)
    const [licenseNumber, setLicenseNumber] = useState(currentCase.licenseNumber)
    const [type, setType] = useState(currentCase.type)
    const [ownerFullName, setOwnerFullName] = useState(currentCase.ownerFullName)
    const [color, setColor] = useState(currentCase.color)
    const [date, setDate] = useState(currentCase.date)
    const [employeeId, setEmployeeId] = useState(currentCase.officer)
    const [description, setDescription] = useState(currentCase.description)
    const [resolution, setResolution] = useState(currentCase.resolution)

    console.log(currentCase)

    useEffect(() => { loadEmployees() }, [setEmployeeList])

    const changeCaseStatus = (e) => {
        setCaseStatus(e.target.value)
    }

    const changeLicenseNumber = (e) => {
        setLicenseNumber(e.target.value)
    }

    const changeType = (e) => {
        setType(e.target.value) 
    }

    const changeOwnerFullName = (e) => {
        setOwnerFullName(e.target.value)
    }

    const changeColor = (e) => {
        setColor(e.target.value)
    }

    const changeDate = (e) => {
        setDate(e.target.value)
    }

    const changeEmployeeId = (e) => {
        setEmployeeId(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    const changeResolution = (e) => {
        setResolution(e.target.value)
    }

    const updateCaseData = async (e) => {
        e.preventDefault()
        
        if(caseStatus == 'done' && !resolution){
            alert('Нужно заполнить закрывающий комментарий!')
            return
        }

        const data = {
            status: caseStatus, ownerFullName, color, licenseNumber, type, date, resolution, description, officer: employeeId
        }

        axios.put(apiDomain + casesUrl + '/' + currentCase._id,data,{
            headers:{
                Authorization: 'Bearer ' + userToken
            }
            
        }).then(res => {
            navigate("/cases");
        }).catch(err => {
            console.log(err)
        })
    }

    const approvedEmployeesList = employeeList.filter((employee) => {
        return employee.approved === true
    })
    
    const loadEmployees = async () => {
        const res = await axios.get(apiDomain + getEmployeeListUrl, {
          headers: {
            Authorization: 'Bearer ' + userToken
          }
        })
        setEmployeeList(res.data.officers)
    } 

    console.log("EmployeeID: " + employeeId)

    return(
        <Fragment>
        <h1 className='caseDetail_title'>Детальная страница сообщения о краже</h1>
        <form className="caseDetail_form" onSubmit={updateCaseData}>
            <label className = "immute">Создано: {moment(currentCase.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</label> <br/>
            {currentCase.updatedAt ? <label className = "immute">Обновлено: {moment(currentCase.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</label> : ""}
            <br/>
            <label>ФИО Владельца</label>
            <input type="text" onChange={changeOwnerFullName} value={ownerFullName} placeholder='ФИО владельца'/>
            <br/>
            <label>Client ID </label>
            <input type="text" value={currentCase.clientId} readOnly />
            <br/>
            <label>Цвет</label>
            <input type="text" onChange={changeColor} value={color} placeholder='Цвет велосипеда'/>
            <br/>
            <label>Дата кражи </label>
            <input type ="date" onChange={changeDate} value={moment(date).format("YYYY-MM-DD")}/>
            <br/>
            <label>Номер лицензии </label>
            <input type="text" onChange={changeLicenseNumber} value={licenseNumber} placeholder='Номер лицензии'/>
            <br/>
            <label>Тип велосипеда </label>
            <input type="text" onChange={changeType} value={type} placeholder='Тип велосипеда'/>
            <br/>
            <label>Подробности </label>
            <input type="text" onChange={changeDescription} value={description} placeholder='Подробности'/>
            <br/>
            <label>Статус заявки </label>
            <select onChange={changeCaseStatus} defaultValue={ caseStatus ? caseStatus : 'default'}>
                <option value="default">Выберите статус</option>
                {availableStatuses.map((s, index) => (<option value={s} key={index}>{s}</option>))}
            </select>
            <br/>
            <label>Выбрать сотрудника: </label>
            <select onChange={changeEmployeeId} defaultValue={ employeeId ? employeeId : 'default'}>
                <option value="default">Выберите сотрудника</option>
                {approvedEmployeesList.map((em, index) => (
                    <option value={em._id} key={index}>{em.firstName} {em.lastName}</option>
                ))}
            </select>
            <br/>
            { caseStatus == 'done' ?
            <Fragment>
                <label>Закрывающий комментарий </label>
                <input type="text" onChange={changeResolution} value={resolution} placeholder='Закрывающий комментарий'/>
                <br/> 
            </Fragment> : ""
            }
            <button type='Submit' className='button save'>Сохранить</button>
        </form>
        </Fragment>
    )
}