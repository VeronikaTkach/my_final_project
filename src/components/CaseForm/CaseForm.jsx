import React, {useState, useContext} from 'react'
import axios from 'axios'
import store from '../../data/store'
import './CaseForm.css'

export const CaseForm = () => {


    const {cases, setCases, login, personsInfo, email} = useContext(store)
    const [licenseNumber, setLicenseNumber] = useState('')
    const [type, setType] = useState('')
    const [ownerFullName, setOwnerFullName] = useState('')
    const [date, setDate] = useState()
    const [description, setDescription] = useState('')
    const [color, setColor] = useState('')
    const [employee, setEmployee] = useState('')





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
        const chosenPerson = approvedPersons.filter((p) => p._id === chosenId)[0]
        setEmployee(chosenPerson._id)
        console.log(chosenPerson._id)
    }


    const onCaseForm = (e) => {
        e.preventDefault()

        if (!ownerFullName){
            alert('Введите Ваши данные ФИО!')
        }
        
        if (!type){
            alert('Choose the type of bike!')
        }

        if (!licenseNumber){
            alert('Введите номер лицензии!')
        }

        const data = {licenseNumber, date, color, type, 
            ownerFullName, employee, description, clientId:'002610f3-abca-4187-9f08-b825e6504605' }
    
            axios.post('https://sf-final-project-be.herokuapp.com/api/public/report',data).then(res=>{
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

    const caseFormCreate = (e) => {
        e.preventDefault()

        if (!ownerFullName){
            alert('Введите ФИО владельца!')
        }

        if (!type){
            alert('Choose the type of bike!')
        }

        if (!licenseNumber){
            alert('Введите номер лицензии!')
        }

        const data = {licenseNumber, date, color, type, 
        ownerFullName, employee, description }

        axios.post('https://sf-final-project-be.herokuapp.com/api/cases/',data,{
            headers:{
                Authorization: 'Bearer '+localStorage.getItem('token')
            }
        }).then(res=>{
            
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





        <form onSubmit={caseFormCreate} className="caseform">
        <input type="text" onChange={changeName} value={ownerFullName} placeholder='ФИО владельца'/>
        <input type="text" onChange={changeLicense} value={licenseNumber} placeholder='Номер лицензии'/>
        <input type="date" onChange={changeDate} value={date} placeholder='Дата кражи'/>
        <input type="text" onChange={changeDescription} value={description} placeholder='Описание'/>
        <input type="text" onChange={changeColor} value={color} placeholder='Цвет'/>


                
        <label  className="type">Тип велосипеда</label>
                <select defaultValue={'default'}  onChange={changeType}>
                    <option value="default">Выберите тип велосипеда:</option>
                    <option value="city">Городской</option>
                    <option value="sport">Спортивный</option>
                    <option value="electric">Электрический</option>
                </select>
        {login ? <button type='submit' className='registration_button'>Отправить</button> : <button onClick={onCaseForm} className='registration_button'>Отправить</button>}
        </form>




        </>
    )
}