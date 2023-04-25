import React, {useState, useContext, useEffect} from 'react'
import { Link } from "react-router-dom"
import { StoreContext } from "../../data/store" 
import axios from 'axios'
import moment from 'moment'
import './CaseList.css'

export const CaseList = () => {

    const casesUrl = "/api/cases"
    const {apiDomain} = useContext(StoreContext)
    const {isLoggedIn} = useContext(StoreContext)
    const [caseList, setCaseList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const userToken = localStorage.getItem('token')

    const onDelete = (e) => {
        e.preventDefault()

        const caseId = e.target.attributes.getNamedItem("id_to_delete").value

        axios.delete(apiDomain + casesUrl + '/' + caseId, {
            headers:{
                Authorization: 'Bearer ' + userToken
            }
        })
        .then(() => loadCases())
    }

    const loadCases = async () => {
        setIsLoading(true)

        if(!isLoggedIn){
            alert('Анонимный доступ невозможен.')
            setCaseList([])
            return
        }

        const res = await axios.get(apiDomain + casesUrl, {
            headers: {
                Authorization: 'Bearer ' + userToken
            }
        })

        setCaseList(res.data.data)

        setIsLoading(false)
    }

    useEffect(() => {
        loadCases()
       },[setIsLoading, setCaseList] )

    
   const rendercases = () => {
    return(
        <>
        {            
            isLoading ? (<h1>Загрузка</h1>): (
                <div className='createTable'>
                    <h1>Сообщения о краже</h1>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Статус</th>
                                <th>Дата кражи</th>
                                <th>ФИО владельца</th>
                                <th>Номер</th>
                                <th>Цвет</th>
                                <th>Тип</th>
                                <th>Описание</th>
                                <th>Итог</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            caseList.map((c) => 
                                    <tr key={c._id}>
                                        <td>{c.status}</td>
                                        <td>{moment(c.date).format("MMMM Do YYYY")}</td>
                                        <td>{c.ownerFullName}</td>
                                        <td>{c.licenseNumber}</td>
                                        <td>{c.color}</td>
                                        <td>{c.type}</td>
                                        <td>{c.description}</td>
                                        <td>{c.resolution}</td>
                                        <td><button onClick={onDelete} id_to_delete={c._id} className='delete'>Удалить</button></td>
                                        <td><Link className='detail_link' to={`./${c._id}`} state={c}><button className="detail">Подробности</button></Link></td> 
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
                
            ) 
        }       
        </>
    )
   } 

    const renderEmptyState = () => {
        return(
            <p>Никого не украли...</p>
        )
    }

    return (
        <>
            {caseList.length ? rendercases() : renderEmptyState()}
        </>
        
    )
}