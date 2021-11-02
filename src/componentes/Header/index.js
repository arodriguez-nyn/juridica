import { useContext } from 'react'

// Servicios
import { cerrarSesion } from 'services/common'

// Dependencias
import { useHistory } from 'react-router-dom'

// Contexto
import AppContext from 'context/AppContext'

// Componentes
import logo from '/static/img/logo-horiz-nn-rgb-amarillo.svg'

import './styles.css'

const Header = () => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const { usuario } = useContext(AppContext)
    const history = useHistory()
    const { guardaUsuario } = useContext(AppContext)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const handleSalir = () => {
        guardaUsuario(null)
        history.push('/login')
        cerrarSesion()
    }

    /* ------------------------------------------------------------------- */
    /* --------------------------- RENDERIZADO --------------------------- */
    /* ------------------------------------------------------------------- */
    return (
        <header className='header'>
            <img className='logo-cabecera' src={logo} alt='logo-cabecera'></img>
            <div className='user'>
                <span onClick={handleSalir}>
                    <i className='fas fa-circle' title='Salir'></i>
                </span>
                <span>{usuario && usuario.nombre}</span>
            </div>
        </header>
    )
}

export default Header
