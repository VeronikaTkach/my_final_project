import React, {useState, useContext} from 'react'
import { StoreContext } from "../../data/store"
import axios from 'axios'
import './CaseForm.css'

export const CaseForm = () => {

    const {isLoggedIn} = useContext(StoreContext)
    const [licenseNumber, setLicenseNumber] = useState('')
    const [type, setType] = useState('')
    const [ownerFullName, setOwnerFullName] = useState('')
    const [date, setDate] = useState()
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [employee, setEmployee] = useState('')

    // const approvedPersons = personsInfo.filter((person) => {
    //     return person.approved === true
    // })

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

    // const changeEmployee = (e) => {
    //     const chosenId = e.target.value
    //     const chosenPerson = approvedPersons.filter((p) => p._id === chosenId)[0]
    //     setEmployee(chosenPerson._id)
    //     console.log(chosenPerson._id)
    // }

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

        const caseFormUrl = (isLoggedIn ? 'https://sf-final-project-be.herokuapp.com/api/cases/' : 'https://sf-final-project-be.herokuapp.com/api/public/report')

        const requestData = () => {
            if (isLoggedIn === true) {
                const data = {licenseNumber, date, color, type, 
                    ownerFullName, employee, description }
            }
            else {
                const data = {licenseNumber, date, color, type, 
                    ownerFullName, description, clientId:'002610f3-abca-4187-9f08-b825e6504605' }
            }
        }

        const requestHeaders = () => {
            if (isLoggedIn === true) {
                return { Authorization: 'Bearer '+localStorage.getItem('token') }
            }
            else {
                return null
            }
        }

        axios.post(caseFormUrl, requestData, requestHeaders).then(res=>{
            setCases(res.data)
            setLicenseNumber('')
            setOwnerFullName('')
            setColor('')
            setType('')
            setDate('')
            setDescription('')
            alert('Report sent')
        }).catch(err => {
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

        {isLoggedIn &&  <div>Ответственный сотрудник:</div>}

        {/* {login && <select onChange={changeEmployee} defaultValue={'default'}>
                    <option value="default">Ответственный сотрудник:</option>
                    {approvedPersons.map((person, index) => (
                        <option value={person._id} key={index}>{person.firstName} {person.lastName}</option>
                    ))}
                </select>} */}
                
        <label  className="type">Тип велосипеда</label>
                <select defaultValue={'default'}  onChange={changeType}>
                    <option value="default">Выберите тип велосипеда:</option>
                    <option value="city">Городской</option>
                    <option value="sport">Спортивный</option>
                    <option value="electric">Электрический</option>
                </select>
                <button type='submit' className='authorization_button'>Вход</button>
        </form>
        </>
    )
}