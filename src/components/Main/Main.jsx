import React, { Fragment } from "react"
import img1 from '../../pictures/img1.jpg'
import './Main.css'

export const Main = () => {

    return (
        <Fragment>
        <div className='company_title'>
            <span className="main_span">Прокат велосипедов</span>
        </div> 
        <div>
            <img src={img1} alt="image" className="image" />

        </div>
        </Fragment>
    )
}
