import { useState } from 'react'

// Dependencias
import { NavLink } from 'react-router-dom'

import './styles.css'

const ExpedientesJudicialesMenu = ({ showParentMenu }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [showMenu, setShowMenu] = useState(false)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClickMenu = () => {
        setShowMenu(!showMenu)
        showParentMenu(!showMenu)
    }

    /* ------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO --------------------------- */
    /* ------------------------------------------------------------------- */
    return (
        <nav className={`nav ${showMenu ? 'nav--show' : ''}`}>
            <div className='toggle-menu' onClick={handleClickMenu}>
                <i className='fas fa-bars toggle-menu__icon'></i>
            </div>
            <ul className={`main-menu ${showMenu ? 'main-menu--show' : ''}`}>
                <li name='shopping-lists' className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/expeju/lista'
                        activeClassName='active'
                    >
                        <i
                            className='fas fa-table main-menu__icon'
                            title='Lista'
                        ></i>
                        <span>Lista</span>
                    </NavLink>
                </li>
                <li className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/expeju/formulario'
                        exact
                        activeClassName='active'
                    >
                        <i
                            className='far fa-file-alt main-menu__icon'
                            title='Formulario'
                        ></i>
                        <span className='main-menu__label' title='Formulario'>
                            Formulario
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default ExpedientesJudicialesMenu
