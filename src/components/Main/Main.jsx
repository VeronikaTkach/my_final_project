import React, { Fragment, useContext } from "react"
import img1 from '../../pictures/img1.jpg'
import { Link } from "react-router-dom"
import { StoreContext } from "../../data/store"
import './Main.css'

export const Main = () => {
    const {isLoggedIn} = useContext(StoreContext)

    return (
        <Fragment>
        <div className='company_title'>
            <span className="main_span">Прокат велосипедов</span>
        </div> 
        <div className="image_wraper">
            <img src={img1} alt="image" className="main_image" />
        </div>

        {isLoggedIn ? 
        <div className="main_routing">
            <Link className='main_link' to='employees'>Ответственные сотрудники</Link>
            <Link className='main_link' to='caseslist'>Список краж</Link>
        </div>
            : 
            null}

        </Fragment>
    )
}