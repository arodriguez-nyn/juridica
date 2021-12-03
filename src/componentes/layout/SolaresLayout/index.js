import { useState } from 'react'

// Componentes
import Menu from 'componentes/Menu'
import Header from 'componentes/Header'

import './styles.css'

const SolaresLayout = ({ children }) => {
    /* -------------------------------------------------------------------- */
    /* --------------------- CONSTANTES Y DECLARACIONES ------------------- */
    /* -------------------------------------------------------------------- */
    const [showMenu, setShowMenu] = useState(false)

    /* -------------------------------------------------------------------- */
    /* ----------------------------- FUNCIONES ---------------------------- */
    /* -------------------------------------------------------------------- */
    const showParentMenu = show => {
        setShowMenu(show)
    }

    /* -------------------------------------------------------------------- */
    /* ---------------------------- RENDERIZADO --------------------------- */
    /* -------------------------------------------------------------------- */
    return (
        <>
            <Header />
            <Menu showMenu={showMenu} setShowMenu={setShowMenu} />
            <main className={`solares-layout ${showMenu ? 'menu--show' : ''}`}>
                {children}
            </main>
            {/* <main className='solares-layout'>{children}</main> */}
        </>
    )
}

export default SolaresLayout
