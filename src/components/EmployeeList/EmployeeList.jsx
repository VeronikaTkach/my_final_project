import React, {useState, useContext, useEffect} from 'react'
import { Link } from "react-router-dom"
import { StoreContext } from "../../data/store" 
import axios from 'axios'
import './EmployeeList.css'

export const EmployeeList = () => {

    const employeesUrl = "/api/officers"
    const {apiDomain} = useContext(StoreContext)
    const {isLoggedIn} = useContext(StoreContext)
    const [employeeList, setEmployeeList] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const userToken = localStorage.getItem('token')

    const onDelete = (e) => {
        e.preventDefault()

        const employeeId = e.target.attributes.getNamedItem("id_to_delete").value

        axios.delete(apiDomain + employeesUrl + '/' + employeeId, {
            headers:{
                Authorization: 'Bearer ' + userToken
            }
        })
        .then(() => loadEmployees())
    }

    const loadEmployees = async () => {
        setIsLoading(true)

        if(!isLoggedIn){
            alert('Анонимный доступ невозможен.')
            setEmployeeList([])
            return
        }

        const res = await axios.get(apiDomain + employeesUrl, {
            headers: {
                Authorization: 'Bearer ' + userToken
            }
        })
        setEmployeeList(res.data.officers)

        setIsLoading(false)
    }

    useEffect(() => {
        loadEmployees()
       },[setIsLoading, setEmployeeList] )

    
   const renderEmployees = () => {
    return(
        <>
        {            
            isLoading ? (<h1>Загрузка</h1>): (
                <div className='wrapper'>
                    <h1>Список сотрудников</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Фамилия</th>
                                <th>Email</th>
                                <th>Одобрен</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            employeeList.map((employee,index) => 
                                    <tr key={employee._id}>
                                        <td>{employee.firstName}</td>
                                        <td>{employee.lastName}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.approved.toString()}</td>
                                        <td><button onClick={onDelete} id_to_delete={employee._id} className='delete'>Удалить</button></td>
                                        <td><Link className='detail_link' to={`./${employee._id}`} state={employee}><button className="detail">Подробности</button></Link></td> 
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
            <p>Никого нет...</p>
        )
    }

    return (
        <>
            {employeeList.length ? renderEmployees() : renderEmptyState()}
        </>
        
    )
}