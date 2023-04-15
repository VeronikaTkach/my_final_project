import React, { Fragment } from 'react'

import './CaseDetail.css'

export const CaseDetail = () => {


    return(
        <Fragment>
        <h1 className='caseDetail_title'>Детальная страница сообщения о краже</h1>
        <form className="caseDetail_form" onSubmit={caseDetailForm}>
            <input type="text" onChange={changeFullName} value={ownerFullName} placeholder='ФИО владельца'/>
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