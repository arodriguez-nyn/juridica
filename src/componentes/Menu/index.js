import { useState } from 'react'

// Dependencias
import { NavLink } from 'react-router-dom'

import './styles.css'

const ExpedientesJudicialesMenu = ({ showMenu, setShowMenu }) => {
    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleClickMenu = () => {
        setShowMenu(!showMenu)
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
                            className='far fa-list-alt main-menu__icon'
                            title='Lista de expedientes'
                        ></i>
                        <span>Lista</span>
                    </NavLink>
                </li>
                <li className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/exjute'
                        exact
                        activeClassName='active'
                    >
                        <i
                            className='far fa-comment-dots main-menu__icon'
                            title='Temas'
                        ></i>
                        <span className='main-menu__label' title='Formulario'>
                            Temas
                        </span>
                    </NavLink>
                </li>
                <li className='main-menu__item'>
                    <NavLink
                        className='nav-link'
                        to='/exjuab'
                        exact
                        activeClassName='active'
                    >
                        <i
                            className='fas fa-gavel main-menu__icon'
                            title='Abogados'
                        ></i>
                        <span className='main-menu__label' title='Formulario'>
                            Abogados
                        </span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default ExpedientesJudicialesMenu
