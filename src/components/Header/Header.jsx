import React from "react";
import { Link } from "react-router-dom";
import css from './Header.css';


const Header = () => {

    return(
        <div className="header">
            <ul className="headerMenu">
                <li>
                    Главная
                </li>
                <li>
                    <Link to ="report">  Сообщить о краже </Link>
                   
                </li>
                <li>
                    Вход/выход
                </li>
            </ul>
        </div>
    )
}

export default Header;